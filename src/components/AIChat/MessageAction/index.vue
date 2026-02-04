<template>
  <div class="message-actions flex flex-wrap gap-2 mt-2 max-h-fit">
    <button
      v-for="action in actions"
      :key="action.key"
      class="px-2 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-150 flex items-center justify-center gap-1.5 min-w-[28px] shrink"
      @click="action.handler"
      :disabled="isButtonDisabled(action.key)"
    >
      <!-- 图标固定显示 -->
      <span class="w-5 h-5 flex items-center justify-center flex-shrink-0">
        <span v-html="action.svg"></span>
      </span>
      <!-- 文字：在空间不足时隐藏 -->
      <span class="hidden md:inline whitespace-nowrap">{{ action.label }}</span>
    </button>
    <audio
      ref="currentAudio"
      @play="
        () => {
          isplaying = true
        }
      "
      @pause="
        () => {
          isplaying = false
        }
      "
      @ended="
        () => {
          isplaying = false
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { generateTTS } from '@/Api/Voice/TTS/Start/TTS/index'
import type { TTSPayload } from '@/types/Voice/TTS/Post'
import { PLAY_SVG, PAUSE_SVG, copy, share, tts, feedback } from './svg/index'
import { computed, ref } from 'vue'

const props = defineProps<{
  messageText: string
}>()

// =============== 状态管理 ===============
const isTTSLoading = ref(false)
const audioBlobUrl = ref<string | null>(null) // 存储生成的 blob URL

// oxlint-disable-next-line no-const-assign
const currentAudio = ref<HTMLAudioElement | null>(null)
const index = ref(0)
const isplaying = ref(false)
// ======================================

// 🔊 TTS 配置
const getTTSConfig = (text: string): TTSPayload => ({
  refer_wav_path:
    'F:\\AI\\GPT-SoVITS\\GPT-SoVITS-Test-resource\\module\\爱莉希雅\\参考音频\\【正常】哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错.wav',
  prompt_text: '哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错',
  prompt_language: 'zh',
  text_language: 'zh',
  text,
})

// =============== 工具函数 ===============
function stopCurrentAudio() {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value = null
  }
}

// =============== 操作方法 ===============
const copyText = async () => {
  try {
    await navigator.clipboard.writeText(props.messageText)
    ElMessage.success({ message: '已复制到剪贴板', duration: 1500 })
  } catch {
    ElMessage.error({ message: '复制失败，请手动复制', duration: 2000 })
  }
}

const generateTTSOnly = async () => {
  const text = props.messageText.trim()
  if (!text) {
    ElMessage.warning('没有可朗读的内容')
    return
  }

  // 如果已有音频，先清理旧的
  if (audioBlobUrl.value) {
    URL.revokeObjectURL(audioBlobUrl.value)
    audioBlobUrl.value = null
    stopCurrentAudio()
  }

  isTTSLoading.value = true
  ElMessage.info('正在生成语音...')

  try {
    const payload = getTTSConfig(text)
    const response = await generateTTS(payload)
    const audioBlob = response.data as Blob

    // 创建 URL 并保存
    const url = URL.createObjectURL(audioBlob)
    audioBlobUrl.value = url

    ElMessage.success('语音生成成功，点击“播放”试听')
  } catch (err: any) {
    let msg = '语音生成失败'
    if (err.response?.status === 500) {
      msg = 'TTS 服务异常（检查参考音频路径）'
    } else if (err.code === 'ERR_NETWORK') {
      msg = '网络连接失败'
    }
    ElMessage.error(msg)
    console.error('TTS 错误:', err)
  } finally {
    isTTSLoading.value = false
  }
}

const playGeneratedAudio = () => {
  if (!audioBlobUrl.value) {
    ElMessage.warning('请先生成语音')
    return
  }
  if (currentAudio.value) {
    currentAudio.value.src = audioBlobUrl.value
  }
  setTimeout(() => {
    currentAudio.value?.play()
  }, 500)
  if (index.value == 0)
    setTimeout(() => {
      currentAudio.value?.play()
    }, 10000)

  index.value++
}

const shareMessage = () => {
  console.log('📤 分享:', props.messageText)
}

const submitFeedback = () => {
  console.log('📝 反馈:', props.messageText)
}

// =============== 按钮禁用逻辑 ===============
const isButtonDisabled = (key: string): boolean => {
  if (key === 'tts') return isTTSLoading.value
  if (key === 'play') return !audioBlobUrl.value // 没有音频时禁用
  return false
}

// =============== 动作配置 ===============
const actions = computed(() => [
  {
    key: 'copy',
    label: '复制',
    svg: copy,
    handler: copyText,
  },
  {
    key: 'tts',
    label: '生成语音',
    svg: tts,
    handler: generateTTSOnly,
  },
  {
    key: 'share',
    label: '分享',
    svg: share,
    handler: shareMessage,
  },
  {
    key: 'feedback',
    label: '反馈',
    svg: feedback,
    handler: submitFeedback,
  },
  // ✅ 新增：播放按钮（第5个）
  {
    key: 'play',
    label: computed(() => (isplaying.value ? '暂停' : '播放')).value,
    svg: isplaying.value ? PAUSE_SVG : PLAY_SVG,
    handler: playGeneratedAudio,
  },
])
</script>

<style scoped>
/* 禁用按钮变灰色 */
.message-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #9ca3af; /* gray-400 */
  background-color: #f3f4f6; /* gray-100 */
}
.message-actions .icon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
