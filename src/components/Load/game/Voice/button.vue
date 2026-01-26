<template>
  <button
    @click="playVoice"
    :disabled="loading"
    class="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 active:bg-white transition-all duration-150 disabled:opacity-50"
    aria-label="播放语音"
  >
    <!-- 可选：加载状态显示旋转图标 -->
    <svg
      v-if="!loading"
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-white drop-shadow-md active:text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
    <svg
      v-else
      class="w-6 h-6 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCurConversationStore } from '@/stores/story/Cur_conversation/index'
import { generateTTS } from '@/Api/Voice/Start/TTS/index'
import type { TTSPayload } from '@/types/Voice/Post'
import { ElMessage } from 'element-plus'
import { getVoiceKeyByText } from '@/util/modalParticle/tool'

const CurConversation = useCurConversationStore()

// 全局唯一的 audio 实例
let globalAudio: HTMLAudioElement | null = null

// 加载状态
const loading = ref(false)

// 获取 AI 生成的语音 URL（返回 Promise<string>）
const getAiMadeVoiceUrl = async (): Promise<string | null> => {
  const curText = CurConversation.CurConversation?.text
  if (!curText) {
    ElMessage.error('转换文本为空')
    return null
  }

  const PostTTS: TTSPayload = {
    refer_wav_path: getVoiceKeyByText(curText),
    prompt_text: '【正常】哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错',
    prompt_language: 'zh',
    text: curText,
    text_language: 'zh'
  }
  console.log('请求文件路径',PostTTS.refer_wav_path)
  try {
    loading.value = true
    const response = await generateTTS(PostTTS)

    return URL.createObjectURL(response.data)
  } catch (error) {
    ElMessage.error('语音合成失败，请重试')
    return null
  } finally {
    loading.value = false
  }
}

// 播放语音（主入口）
const playVoice = async () => {
  console.log('触发点击')

  // 1. 获取新语音 URL
  const audioUrl = await getAiMadeVoiceUrl()
  console.log('返回的blob地址',audioUrl)
  if (!audioUrl) return

  // 2. 停止当前播放
  if (globalAudio) {
    globalAudio.pause()
    // 如果之前用了 createObjectURL，记得 revoke
    if (globalAudio.src.startsWith('blob:')) {
      URL.revokeObjectURL(globalAudio.src)
    }
  }

  // 3. 播放新语音
  globalAudio = new Audio(audioUrl)
  globalAudio.volume = 0.7

  try {
    await globalAudio.play()
  } catch (err: any) {
    if (err.name !== 'AbortError') {
      console.warn('语音播放失败:', err)
      ElMessage.error('播放失败')
    }
  }
}
</script>