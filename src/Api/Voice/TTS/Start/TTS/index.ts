//Api/Voice/TTS/Start/TTS
import VoiceInterface from '@/Api/Voice/TTS/index' // 您的 axios 实例
import type { TTSPayload } from '@/types/Voice/TTS/Post'

export const generateTTS = (payload: TTSPayload) => {
  console.log('提供的数据:', payload)
  return VoiceInterface.get('/', {
    params: payload,
    responseType: 'blob', // ⚠️ 必须加！
  })
}
