// composables/useTTS.ts
import STTInterface from '@/Api/Voice/STT/index' // 您的 axios 实例
import type { STTResponse } from '@/types/Voice/STT/post'
import type { AxiosResponse } from 'axios'

export const transcribeAudio = async (audio: File | Blob): Promise<STTResponse> => {
  const formData = new FormData()
  formData.append('audio', audio, 'recording.wav')

  const response: AxiosResponse<STTResponse> = await STTInterface.post('/stt', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
