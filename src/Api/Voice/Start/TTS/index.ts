// composables/useTTS.ts
import VoiceInterface from '@/Api/Voice/index' // 您的 axios 实例
import type {TTSPayload} from '@/types/Voice/Post'


export const generateTTS = (payload: TTSPayload) => {
  return VoiceInterface.get('/' , {
    params: payload,
    responseType: 'blob' // ⚠️ 必须加！
  })
}