// src/composables/useVoiceRecorder.ts
// src/composables/useVoiceRecorder.ts
import { ref } from 'vue'
import type { Ref } from 'vue' // 👈 关键：用 import type
import { transcribeAudio } from '@/Api/Voice/STT/Start/STT/index'

export interface VoiceRecorderResult {
  isRecording: Ref<boolean>
  isProcessing: Ref<boolean>
  errorMessage: Ref<string | null>
  startRecording: () => Promise<void>
  stopRecording: () => Promise<string | null>
  cancelRecording: () => void
  getRmsVolume: (buffer: Float32Array) => number
  audioChunks: Ref<Float32Array[]>
}

const SAMPLE_RATE = 16000

export function useVoiceRecorder(): VoiceRecorderResult {
  const isRecording = ref(false)
  const isProcessing = ref(false)
  const errorMessage = ref<string | null>(null)
  const audioChunks = ref<Float32Array[]>([])

  let audioContext: AudioContext | null = null
  let mediaStream: MediaStream | null = null
  let processor: ScriptProcessorNode | null = null

  async function startRecording() {
    if (isRecording.value || isProcessing.value) return

    errorMessage.value = null
    audioChunks.value = []
    isRecording.value = true

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStream = stream

      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: SAMPLE_RATE,
      })

      const source = audioContext.createMediaStreamSource(stream)
      const bufferSize = 2048
      processor = audioContext.createScriptProcessor(bufferSize, 1, 1)

      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0)
        audioChunks.value.push(input.slice())
      }

      source.connect(processor)
      processor.connect(audioContext.destination)
    } catch (err) {
      errorMessage.value = '无法访问麦克风，请检查权限。'
      isRecording.value = false
      throw err
    }
  }

  async function stopRecording(): Promise<string | null> {
    if (!isRecording.value) return null

    isRecording.value = false
    isProcessing.value = true

    try {
      if (processor) processor.disconnect()
      if (audioContext) await audioContext.close()
      if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop())

      const totalLength = audioChunks.value.reduce((sum, arr) => sum + arr.length, 0)
      const fullBuffer = new Float32Array(totalLength)
      let offset = 0
      for (const chunk of audioChunks.value) {
        fullBuffer.set(chunk, offset)
        offset += chunk.length
      }

      const wavBlob = encodeWAV(fullBuffer, SAMPLE_RATE)

      const result = await transcribeAudio(wavBlob)
      return result.text?.trim() || null
    } catch (err: any) {
      console.error('STT Error:', err)
      errorMessage.value = '语音识别失败：' + (err.response?.data?.error || err.message || '请重试')
      return null
    } finally {
      isProcessing.value = false
      reset()
    }
  }

  function cancelRecording() {
    isRecording.value = false
    if (processor) processor.disconnect()
    if (audioContext) audioContext.close()
    if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop())
    reset()
  }

  function reset() {
    audioContext = null
    mediaStream = null
    processor = null
    audioChunks.value = []
  }

  function getRmsVolume(buffer: Float32Array): number {
    let sum = 0
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i]
    }
    const rms = Math.sqrt(sum / buffer.length)
    return Math.min(100, rms * 3000)
  }

  return {
    isRecording,
    isProcessing,
    errorMessage,
    audioChunks,
    startRecording,
    stopRecording,
    cancelRecording,
    getRmsVolume,
  }
}

function encodeWAV(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(buffer)

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + samples.length * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, samples.length * 2, true)

  const volume = 0.9
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i] * volume))
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }

  return new Blob([view], { type: 'audio/wav' })
}
