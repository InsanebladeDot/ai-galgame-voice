// 设置模型
import VoiceInterface from '@/Api/Voice/TTS/index' // 您的 axios 实例
import type { VoiceModel } from '@/types/module/index'

export const SetModule = (voiceModels: VoiceModel) => {
  return VoiceInterface.get('/set_model', {
    params: voiceModels,
  })
}
