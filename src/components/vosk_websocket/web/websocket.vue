<template>
  <div
    class="voice-container absolute top-1 right-[11.111%] z-[9999] max-w-[300px] max-h-[600px] overflow-y-auto overflow-x-hidden rounded-lg shadow-lg bg-white"
  >
    <!-- 录音按钮 -->
    <el-button
      circle
      :icon="isRecording ? Mute : Microphone"
      @click="handleVoiceClick"
      :disabled="!isWsConnected || isRecording"
      class="voice-btn"
      style="width: 45px; height: 45px; font-size: larger"
    />

    <!-- 状态栏 -->
    <div class="status-bar" :class="statusClass">
      {{ statusText }}
      <span v-if="currentRms > 0" class="rms-badge">音量: {{ Math.round(currentRms) }}</span>
    </div>

    <!-- 转录文本框 -->
    <div v-if="transcript" class="transcript-box">
      <p>{{ transcript }}</p>
    </div>
    <!-- Ai 反馈文本 -->
    <div v-if="Ai_response" class="transcript-box">
      <Typewriter :full-text="Ai_response" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Microphone, Mute } from '@element-plus/icons-vue'
import { ref, computed, onUnmounted, onMounted, watch } from 'vue'
import { startMicrophone, stopMicrophone } from '@/util/microphone/index'
import { useWebSocket } from '@/stores/web/WebSocket'
import { startAudioStreamPush } from '@/util/voice/Stream/audioStreamPusher' // ✅ 导入封装函数
import { beginMessage, type BeginMessagePayload } from '@/Api/Chat/start/message/index'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import Typewriter from '@/components/util/Typewriter.vue'

//提交数据给父组件
const emit = defineEmits(['submit-data'])

const SystemSetting = useSystemSettingStore()
// ===== 状态管理（组件自身维护）=====
const mediaStream = ref<MediaStream | null>(null)
const isRecording = ref(false)
const currentRms = ref(0)
const transcript = ref('')
const Ai_response = ref('')
let cleanupPush: (() => void) | null = null // 保存清理函数

// ===== WebSocket（解构 wsClient）=====
const { status, message, connect, disconnect, wsClient } = useWebSocket({
  url: SystemSetting.customAiModel.sttStreamBaseUrl,
  autoConnect: false,
  reconnectMaxAttempts: 3,
  reconnectDelayBase: 1500,
  heartbeatInterval: 30000,
  heartbeatMessage: { type: 'ping' },
})

// ===== 状态计算（保持不变）=====
const isWsConnected = computed(() => status.value === 'OPEN')
const statusText = computed(() =>
  isRecording.value
    ? '🗣️ 录音中...'
    : status.value === 'OPEN'
      ? '✅ 已连接'
      : ['CONNECTING', 'RECONNECTING'].includes(status.value)
        ? '⟳ 连接中...'
        : '❌ 未连接',
)
const statusClass = computed(() =>
  isRecording.value
    ? 'open'
    : status.value === 'OPEN'
      ? 'open'
      : ['CONNECTING', 'RECONNECTING'].includes(status.value)
        ? 'connecting'
        : 'closed',
)

// ===== 核心：启动/停止逻辑（极简）=====
const handleVoiceClick = async () => {
  if (isRecording.value) {
    // 停止：调用清理函数 + 重置状态
    cleanupPush?.()
    cleanupPush = null
    stopMicrophone(mediaStream.value)
    mediaStream.value = null
    isRecording.value = false
    currentRms.value = 0
    console.log('⏹ 麦克风已关闭')
    return
  }

  if (!isWsConnected.value) {
    console.warn('⚠️ WebSocket 未连接')
    return
  }

  try {
    // 1. 启动麦克风
    mediaStream.value = await startMicrophone({
      sampleRate: 16000,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    })

    // 2. 启动音频流推送（✅ 关键：传入状态获取器）
    cleanupPush = startAudioStreamPush(
      mediaStream.value,
      wsClient, // 普通对象，无.value
      () => isRecording.value, // 闭包安全获取最新状态
    )

    isRecording.value = true
    transcript.value = ''
    console.log('🎤 麦克风已启动，音频流推送中...')
  } catch (error) {
    console.error('❌ 麦克风启动失败:', error)
    // 安全清理（即使失败也调用）
    cleanupPush?.()
    cleanupPush = null
    if (mediaStream.value) {
      stopMicrophone(mediaStream.value)
      mediaStream.value = null
    }
  }
}

//Ai 请求参数体
const Ai_Chat = async () => {
  const payload: BeginMessagePayload = {
    model: SystemSetting.customAiModel.modelName,
    messages: [
      {
        role: 'user',
        content: transcript.value,
      },
    ],
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
  console.log('Ai回复的文本', aiContent)
  emit('submit-data', aiContent)

  Ai_response.value = aiContent || ''
}
// ===== 状态监听（WebSocket断开时自动清理）=====
watch(status, (newVal) => {
  if (newVal === 'CLOSED' && isRecording.value) {
    console.warn('⚠️ WebSocket 断开，自动停止录音')
    cleanupPush?.()
    cleanupPush = null
    stopMicrophone(mediaStream.value)
    mediaStream.value = null
    isRecording.value = false
    currentRms.value = 0
  }
})
//动态接受返回的 TTS 值 包括正在翻译的值 和最终翻译的值
watch(message, (newMsg) => {
  // 接受最终值 最终值为最终的翻译文本
  if (newMsg?.final) {
    transcript.value = newMsg.final ?? ''
    //最终对话进行Ai 对话操作
    Ai_Chat()
  } else transcript.value = newMsg?.partial ?? ''

  console.log('📬 收到服务器返回值:', newMsg?.final)
  // 处理业务逻辑
})

// ===== 生命周期 =====
onMounted(() => connect())
onUnmounted(() => {
  disconnect()
  if (isRecording.value) {
    cleanupPush?.()
    stopMicrophone(mediaStream.value)
  }
  cleanupPush = null
})
</script>

<style scoped>
.voice-container {
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.action-btn {
  width: 100%;
  padding: 14px 20px;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(67, 97, 238, 0.3);
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(67, 97, 238, 0.4);
}

.action-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

.status-bar {
  margin-top: 0.5rem;
  padding: 10px;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #495057;
}

.status-bar span:first-child {
  font-size: 1.2em;
}

.status-bar.open {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}
.status-bar.connecting,
.status-bar.reconnecting {
  background: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}
.status-bar.closed {
  background: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

.rms-badge {
  margin-left: auto;
  background: #e9ecef;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.transcript-box {
  margin-top: 1.5rem;
  padding: 15px;
  background: white;
  border-radius: 8px;
  min-height: 60px;
  border: 1px solid #dee2e6;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #212529;
}
</style>
