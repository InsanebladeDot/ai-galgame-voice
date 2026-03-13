<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="h-full flex flex-col bg-white border-r border-gray-200">
    <!-- 消息区域 -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex flex-col"
        :class="{ 'items-end': msg.isOwn }"
      >
        <!-- 消息气泡 -->
        <div
          v-if="index !== 0"
          class="max-w-[90%] px-4 py-2 rounded-lg break-words prose prose-sm"
          :class="msg.isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
        >
          <!-- ✅ 现在 TypeScript 知道 msg.text 是 string -->
          <div v-html="renderMarkdown(msg.text)" />
          <MessageAction v-if="!msg.isOwn" :message-text="msg.text" />
        </div>
      </div>

      <!-- AI 正在思考... -->
      <div v-if="loading" class="flex justify-start">
        <div class="max-w-[90%] px-4 py-2 rounded-lg bg-gray-200 text-gray-800">AI 正在思考...</div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="p-3 border-t border-gray-200">
      <ChatInput @send="handleSendMessage" :disabled="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import ChatInput from './Chat/ChatInput.vue'
import MessageAction from './MessageAction/index.vue'
import { beginMessage } from '@/Api/Chat/start/message/index'
import type { BeginMessagePayload } from '@/Api/Chat/start/message/index'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useRoleStore } from '@/stores/Roles/Role'

const RoleStore = useRoleStore()
// 辅助函数：确保返回字符串
function ensureString(value: unknown): string {
  if (typeof value === 'string') return value
  if (value instanceof Promise) {
    console.error('意外的 Promise 值:', value)
    return '[Promise]'
  }
  return String(value)
}

// 消息类型
interface ChatMessage {
  text: string
  isOwn: boolean
}

const messages = ref<ChatMessage[]>([])

const loading = ref(false)
const messagesContainer = ref<HTMLDivElement | null>(null)

const renderMarkdown = (text: string): string => {
  const html = marked(text, { breaks: true, gfm: true })
  return DOMPurify.sanitize(html)
}

const scrollToBottom = () => {
  nextTick(() => {
    messagesContainer.value?.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth',
    })
  })
}

const handleSendMessage = async (userMessage: string) => {
  if (!userMessage.trim() || loading.value) return

  // ✅ 用户输入一定是字符串
  messages.value.push({ text: userMessage, isOwn: true })
  scrollToBottom()

  loading.value = true
  scrollToBottom()

  try {
    const payload: BeginMessagePayload = {
      model: 'Qwen/Qwen2.5-7B-Instruct',
      messages: messages.value.map((msg) => ({
        role: msg.isOwn ? 'user' : 'assistant',
        content: msg.text,
      })),
      max_tokens: 1024,
      stream: false,
    }

    const response = await beginMessage(payload)

    let aiContent: string | null = null
    const contentArray = response.data.content
    if (Array.isArray(contentArray)) {
      for (const item of contentArray) {
        if (item?.type === 'text' && typeof item.text === 'string') {
          aiContent = item.text
          break
        }
      }
    }

    // ✅ 关键：用 ensureString 包裹，确保 text 字段是 string
    messages.value.push({
      text: ensureString(aiContent ?? '抱歉，我无法生成回复。'),
      isOwn: false,
    })
  } catch (error) {
    console.error('AI 回复失败:', error)
    messages.value.push({
      text: '网络错误，请稍后重试。',
      isOwn: false,
    })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}

onMounted(async () => {
  // 初始化角色扮演
  const rolePrompt = RoleStore.role?.acterDesignTerms?.trim()
  if (rolePrompt) {
    loading.value = true

    try {
      const payload: BeginMessagePayload = {
        model: 'Qwen/Qwen2.5-7B-Instruct',
        messages: [
          {
            role: 'user', // Qwen 不支持 system，用 user 模拟
            content: rolePrompt,
          },
        ],
        max_tokens: 1024,
        stream: false,
      }

      const response = await beginMessage(payload)

      let aiContent = '你好！我已经准备好扮演这个角色了～'
      const contentArray = response.data.content
      if (Array.isArray(contentArray)) {
        for (const item of contentArray) {
          if (item?.type === 'text' && typeof item.text === 'string') {
            aiContent = item.text
            break
          }
        }
      }

      // 加入设定的角色剧本
      messages.value.push({
        text: ensureString(rolePrompt),
        isOwn: true,
      })
      // 将 AI 的初始回复加入消息列表（作为助手消息）
      messages.value.push({
        text: ensureString(aiContent),
        isOwn: false,
      })
    } catch (error) {
      console.error('角色初始化失败:', error)
      messages.value.push({
        text: '角色加载失败，请稍后重试。',
        isOwn: false,
      })
    } finally {
      loading.value = false
      scrollToBottom()
    }
  }
})
</script>
