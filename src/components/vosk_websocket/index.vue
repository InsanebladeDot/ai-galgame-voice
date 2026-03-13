<template>
  <!-- 语音状态指示器 -->
  <div class="fixed top-4 right-4 z-[3001] flex flex-col items-end gap-2">
    <div
      class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-md border border-gray-200"
    >
      <div
        class="w-3 h-3 rounded-full"
        :class="{
          'bg-green-500 animate-pulse': isListening,
          'bg-yellow-400': isConnecting,
          'bg-red-500': hasError,
        }"
      ></div>
      <span class="text-sm font-medium text-gray-800">{{ statusText }}</span>
    </div>
    <button
      @click="toggleRecording"
      class="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95"
      :disabled="isConnecting || hasError"
      aria-label="开始/停止录音"
    >
      <div v-if="isRecording" class="flex flex-col items-center">
        <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse mb-1"></div>
        <span class="text-xs font-bold">录制中</span>
      </div>
      <div v-else class="text-2xl">🎤</div>
    </button>
  </div>

  <!-- 对话记录框 -->
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3000] w-[90%] max-w-2xl h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
  >
    <div
      class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-3 flex items-center justify-between"
    >
      <h2 class="font-bold text-lg flex items-center"><span class="mr-2">💬</span>语音对话</h2>
      <div class="flex items-center gap-2">
        <span class="text-xs bg-white/20 px-2 py-1 rounded-full"
          >{{ connectedClients }} 客户端</span
        >
        <button class="text-white hover:text-indigo-200 transition text-sm" @click="clearChat">
          🗑️ 清空
        </button>
      </div>
    </div>

    <div
      id="chat-messages"
      ref="chatContainer"
      class="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50"
    >
      <!-- 动态对话消息 -->
      <template v-for="(msg, index) in chatMessages" :key="index">
        <!-- 用户消息（语音识别结果） -->
        <div v-if="msg.role === 'user'" class="flex justify-end animate-fade-in">
          <div
            v-if="index !== 0"
            class="max-w-[80%] bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-br-none px-5 py-3 shadow-md relative group"
          >
            <div class="font-medium flex items-center justify-between">
              <span>我</span>
              <span class="text-xs opacity-80 ml-2">{{ formatTime(msg.timestamp) }}</span>
            </div>
            <div class="mt-1 whitespace-pre-wrap">{{ msg.content }}</div>
            <div
              class="absolute bottom-0 right-[-12px] w-6 h-6 bg-blue-500 rotate-45 transform origin-top-left"
            ></div>
          </div>
        </div>

        <!-- AI响应 -->
        <div v-else class="flex justify-start animate-fade-in">
          <div
            class="max-w-[80%] bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-none px-5 py-3 shadow-sm relative group"
          >
            <div class="font-medium flex items-center">
              <span class="mr-2">🤖</span>AI助手
              <span class="text-xs text-gray-500 ml-2">{{ formatTime(msg.timestamp) }}</span>
            </div>
            <div class="mt-1 whitespace-pre-wrap">{{ msg.content }}</div>
            <div
              class="absolute bottom-0 left-[-12px] w-6 h-6 bg-white border border-gray-200 rotate-45 transform origin-top-right"
            ></div>

            <!-- 复制按钮（悬停显示） -->
            <button
              @click="copyToClipboard(msg.content)"
              class="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              title="复制内容"
            >
              复制
            </button>
          </div>
        </div>
      </template>

      <!-- 语音识别中的临时结果 -->
      <div v-if="partialText" class="flex justify-end opacity-70 animate-pulse">
        <div class="max-w-[80%] bg-blue-100 text-blue-800 rounded-2xl rounded-br-none px-5 py-2">
          {{ partialText }}
        </div>
      </div>
    </div>

    <!-- 底部控制栏 -->
    <div class="bg-gray-100 p-3 border-t flex items-center gap-2">
      <input
        type="text"
        v-model="manualInput"
        @keyup.enter="sendMessage"
        placeholder="输入消息或点击麦克风开始语音..."
        class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <button
        @click="sendMessage"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        发送
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

import { beginMessage } from '@/Api/Chat/start/message/index'
import type { BeginMessagePayload } from '@/Api/Chat/start/message/index'
import { useRoleStore } from '@/stores/Roles/Role'

const RoleStore = useRoleStore()

// WebSocket 配置
const WS_URL = 'ws://localhost:2700'
const SAMPLE_RATE = 16000

// 响应式状态
const isConnecting = ref(false)
const isListening = ref(false)
const isRecording = ref(false)
const hasError = ref(false)
const statusText = ref('离线')
const chatMessages = ref<Array<{ role: 'user' | 'ai'; content: string; timestamp: number }>>([
  { role: 'user', content: RoleStore.role?.acterDesignTerms?.trim() || '', timestamp: Date.now() },
])
const partialText = ref('')
const connectedClients = ref(0)
const manualInput = ref('')
const chatContainer = ref<HTMLElement | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
const ws = ref<WebSocket | null>(null)

// 计算状态文本
watch([isConnecting, isListening, hasError], () => {
  if (hasError.value) statusText.value = '连接错误'
  else if (isConnecting.value) statusText.value = '连接中...'
  else if (isListening.value) statusText.value = '聆听中'
  else statusText.value = '已连接'
})

// 初始化 WebSocket
const initWebSocket = () => {
  if (ws.value) {
    ws.value.close()
    ws.value = null
  }

  hasError.value = false
  isConnecting.value = true

  try {
    ws.value = new WebSocket(WS_URL)

    ws.value.onopen = () => {
      console.log('WebSocket 连接成功')
      isConnecting.value = false
      isListening.value = true
      statusText.value = '已连接'
      sendAudioConfig()
    }

    ws.value.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data)

          // 处理连接确认
          if (data.type === 'connected') {
            connectedClients.value = 1 // 初始化为1，后续从健康检查更新
            getHealthStatus()
            console.log('服务器确认连接:', data)
            return
          }

          // 处理识别结果
          if (data.type === 'transcription') {
            if (data.partial) {
              partialText.value = data.partial
            }

            if (data.final) {
              // 添加到对话（部分结果）
              addMessage('user', data.final)
              partialText.value = ''
            }

            if (data.final_sentence) {
              // 完整句子识别完成
              addMessage('user', data.final_sentence)
              partialText.value = ''

              // 自动请求AI响应
              setTimeout(() => {
                getAIResponse(data.final_sentence)
              }, 300)
            }
          }

          // 处理错误
          if (data.type === 'error') {
            console.error('服务器错误:', data.message)
            showError('服务器错误: ' + data.message)
          }
        } catch (e) {
          console.error('解析消息失败:', e)
        }
      }
    }

    ws.value.onclose = (event) => {
      console.log('WebSocket 连接关闭:', event.code, event.reason)
      isConnecting.value = false
      isListening.value = false

      if (event.code !== 1000) {
        // 非正常关闭
        showError('连接已断开，5秒后尝试重连')
        setTimeout(initWebSocket, 5000)
      }
    }

    ws.value.onerror = (error) => {
      console.error('WebSocket 错误:', error)
      showError('WebSocket 连接失败')
    }
  } catch (e) {
    console.error('WebSocket 初始化失败:', e)
    showError('无法创建 WebSocket 连接')
  }
}

// 获取健康状态（更新连接客户端数）
const getHealthStatus = async () => {
  try {
    const response = await fetch('http://localhost:2701/health')
    const data = await response.json()
    connectedClients.value = data.clients_connected || 0
  } catch (e) {
    console.log('健康检查失败，使用默认值')
  }
}

// 发送音频配置
const sendAudioConfig = () => {
  if (!ws.value || ws.value.readyState !== WebSocket.OPEN) return

  ws.value.send(
    JSON.stringify({
      type: 'config',
      rms_threshold: 800,
      silence_duration: 1.0,
    }),
  )
}

// 启动录音
const startRecording = async () => {
  if (isRecording.value || !ws.value || ws.value.readyState !== WebSocket.OPEN) return

  try {
    // 请求麦克风权限
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    // 创建MediaRecorder（使用16kHz采样率，单声道）
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: SAMPLE_RATE,
    })

    const source = audioContext.createMediaStreamSource(stream)
    const processor = audioContext.createScriptProcessor(4096, 1, 1)

    let isProcessing = false
    processor.onaudioprocess = (e) => {
      if (!isRecording.value || isProcessing || !ws.value) return
      isProcessing = true

      try {
        // 获取音频数据
        const inputData = e.inputBuffer.getChannelData(0)

        // 转换为16位整数（-32768 到 32767）
        const buffer = new ArrayBuffer(inputData.length * 2)
        const view = new DataView(buffer)

        for (let i = 0; i < inputData.length; i++) {
          // 归一化到16位整数
          const s = Math.max(-1, Math.min(1, inputData[i]))
          view.setInt16(i * 2, s < 0 ? s * 32768 : s * 32767, true)
        }

        // 发送到WebSocket
        if (ws.value && ws.value.readyState === WebSocket.OPEN) {
          ws.value.send(buffer)
        }
      } catch (e) {
        console.error('音频处理错误:', e)
      } finally {
        isProcessing = false
      }
    }

    source.connect(processor)
    processor.connect(audioContext.destination)

    isRecording.value = true
    audioChunks.value = []
    console.log('开始录音，采样率:', audioContext.sampleRate)

    // 每5秒更新一次健康状态
    const healthInterval = setInterval(getHealthStatus, 5000)

    // 监听停止事件
    const stopRecording = () => {
      clearInterval(healthInterval)
      source.disconnect()
      processor.disconnect()
      stream.getTracks().forEach((track) => track.stop())
    }

    // 保存清理函数
    mediaRecorder.value = {
      stop: stopRecording,
    } as unknown as MediaRecorder
  } catch (err) {
    console.error('录音启动失败:', err)
    showError('无法访问麦克风，请检查权限设置')
    isRecording.value = false
  }
}

// 停止录音
const stopRecording = () => {
  if (!isRecording.value || !mediaRecorder.value) return

  try {
    mediaRecorder.value.stop()
    isRecording.value = false
    console.log('录音已停止')
  } catch (e) {
    console.error('停止录音失败:', e)
  }
}

// 切换录音状态
const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

// 添加消息到对话
const addMessage = (role: 'user' | 'ai', content: string) => {
  if (!content.trim()) return

  chatMessages.value.push({
    role,
    content: content.trim(),
    timestamp: Date.now(),
  })
  if (role === 'user') {
    console.log('当前对话消息:', chatMessages.value)
    //api 请求
    getAIResponse()
  }
  // 滚动到底部
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// 模拟AI响应（实际应替换为你的AI API）
const getAIResponse = async () => {
  const payload: BeginMessagePayload = {
    model: 'Qwen/Qwen2.5-7B-Instruct',
    messages: chatMessages.value.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
    max_tokens: 1024,
    stream: false,
  }

  const response = await beginMessage(payload)
  console.log('AI响应:', response.data.content)
  lastAIResponse.value = response.data.content[0].text || ''
  chatMessages.value.push({
    role: 'ai',
    content: response.data.content[0].text || '抱歉，我无法生成回复。',
    timestamp: Date.now(),
  })
}

// 发送手动输入的消息
const sendMessage = () => {
  if (!manualInput.value.trim()) return

  addMessage('user', manualInput.value)
  manualInput.value = ''
}

// 显示错误
const showError = (message: string) => {
  hasError.value = true
  statusText.value = message
  console.error('[语音识别错误]', message)

  // 3秒后清除错误状态
  setTimeout(() => {
    if (hasError.value) {
      hasError.value = false
      if (ws.value?.readyState === WebSocket.OPEN) {
        statusText.value = '已连接'
      }
    }
  }, 3000)
}

// 格式化时间
const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  return (
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0')
  )
}

// 复制到剪贴板
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 显示短暂提示
    const originalText = statusText.value
    statusText.value = '已复制!'
    setTimeout(() => {
      statusText.value = originalText
    }, 1500)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 清空对话
const clearChat = () => {
  chatMessages.value = []
  partialText.value = ''
}

// 生命周期钩子
onMounted(() => {
  // 检查浏览器兼容性
  if (!window.WebSocket || !navigator.mediaDevices) {
    showError('浏览器不支持 WebSocket 或媒体设备')
    return
  }

  // 初始化 WebSocket
  initWebSocket()

  // 页面可见性变化时重连
  document.addEventListener('visibilitychange', () => {
    if (
      document.visibilityState === 'visible' &&
      (!ws.value || ws.value.readyState !== WebSocket.OPEN)
    ) {
      initWebSocket()
    }
  })
})

onUnmounted(() => {
  // 清理资源
  if (isRecording.value) {
    stopRecording()
  }

  if (ws.value) {
    ws.value.close()
    ws.value = null
  }

  document.removeEventListener('visibilitychange', () => {})
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  overflow: hidden;
}

/* 消息淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* 气泡三角指示器优化 */
#chat-messages .relative > div:last-child {
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));
}
/* 滚动条美化 */
#chat-messages::-webkit-scrollbar {
  width: 6px;
}
#chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
#chat-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
#chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
