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
          class="max-w-[90%] px-4 py-2 rounded-lg break-words prose prose-sm"
          :class="msg.isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'"
        >
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
import { ref, nextTick } from 'vue'
import ChatInput from './Chat/ChatInput.vue'
import MessageAction from './MessageAction/index.vue'

import { beginMessage } from '@/Api/Chat/start/message/index'
import type { BeginMessagePayload } from '@/Api/Chat/start/message/index'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useRoleStore } from '@/stores/Roles/Role/index'

const RoleStore = useRoleStore()

// 简化消息类型（仅文本 + 角色）
interface ChatMessage {
  text: string
  isOwn: boolean
}

const messages = ref<ChatMessage[]>([
  {
    text: `你好！我是 ${RoleStore.role?.displayName}，我可以回答你的问题、提供帮助。`,
    isOwn: false,
  },
])

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
    const aiContent = response.data.content?.find((c: any) => c.type === 'text')?.text

    if (typeof aiContent !== 'string') {
      messages.value.push({ text: '抱歉，我无法生成回复。', isOwn: false })
    } else {
      messages.value.push({ text: aiContent, isOwn: false })
      if (RoleStore.role) RoleStore.role.dialog = aiContent
    }
  } catch (error) {
    messages.value.push({ text: '网络错误，请稍后重试。', isOwn: false })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.prose {
  font-size: 0.875rem;
  line-height: 1.5;
}
.prose :where(p):not(:where([class～='not-prose'] *)) {
  margin: 0.5em 0;
}
.prose :where(code):not(:where([class～='not-prose'] *)) {
  padding: 0.2em 0.4em;
  background-color: rgba(150, 150, 150, 0.2);
  border-radius: 0.25rem;
  font-size: 0.85em;
}
.prose :where(pre):not(:where([class～='not-prose'] *)) {
  background-color: #f5f5f5;
  padding: 0.75em;
  border-radius: 0.375rem;
  overflow-x: auto;
}
.bg-gray-200 .prose :where(code):not(:where([class～='not-prose'] *)) {
  background-color: rgba(100, 100, 100, 0.15);
}
</style>
