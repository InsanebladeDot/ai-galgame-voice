<template>
  <div class="p-4 max-w-md mx-auto">
    <button
      class="px-4 py-2 text-white font-medium rounded disabled:opacity-60 disabled:cursor-not-allowed"
      :class="isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'"
      @click="toggleRecording"
      :disabled="isProcessing"
    >
      {{ isRecording ? '停止录音' : '开始录音' }}
    </button>

    <div v-if="audioUrl" class="mt-4">
      <p class="text-gray-700 mb-1">录音完成：</p>
      <audio :src="audioUrl" controls class="w-full" />
    </div>

    <div
      v-if="transcribedText"
      class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-800"
    >
      <p><strong>识别结果：</strong>{{ transcribedText }}</p>
    </div>

    <p v-if="errorMessage" class="mt-2 text-red-600">{{ errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { transcribeAudio } from '@/Api/Voice/STT/Start/STT/index'

const isRecording = ref(false)
const audioContext = ref<AudioContext | null>(null)
const mediaStream = ref<MediaStream | null>(null)
const processor = ref<ScriptProcessorNode | null>(null)
const audioData = ref<Float32Array[]>([])
const SAMPLE_RATE = 16000
const isProcessing = ref(false)
const audioUrl = ref<string | null>(null)
const transcribedText = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

// ✅ 必须在 toggleRecording 之前定义！
function encodeWAV(samples: Float32Array): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(buffer)

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + samples.length * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, SAMPLE_RATE, true)
  view.setUint32(28, SAMPLE_RATE * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, samples.length * 2, true)

  const volume = 0.9

for (let i = 0; i < samples.length; i++) {
  // 现在 TS 知道 samples 肯定存在且有 .length
  const value = samples[i];
  if (value !== undefined) {
    const s = Math.max(-1, Math.min(1, value * volume));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

  return new Blob([view], { type: 'audio/wav' })
}

const stopRecording = async () => {
  if (!processor.value || !audioContext.value || !mediaStream.value) return
  processor.value.disconnect()
  await audioContext.value.close()
  mediaStream.value.getTracks().forEach((t) => t.stop())
}

const toggleRecording = async () => {
  if (isRecording.value) {
    isProcessing.value = true
    await stopRecording()

    const totalLength = audioData.value.reduce((sum, arr) => sum + arr.length, 0)
    const fullBuffer = new Float32Array(totalLength)
    let offset = 0
    for (const chunk of audioData.value) {
      fullBuffer.set(chunk, offset)
      offset += chunk.length
    }

    const wavBlob = encodeWAV(fullBuffer) // ✅ 现在可以找到了
    audioUrl.value = URL.createObjectURL(wavBlob)

    try {
      const result = await transcribeAudio(wavBlob)
      transcribedText.value = result.text || '未识别到内容'
    } catch (err: any) {
      console.error('STT 错误:', err)
      errorMessage.value =
        '语音识别失败：' + (err.response?.data?.error || err.message || '请检查后端服务')
    } finally {
      isProcessing.value = false
    }

    isRecording.value = false
    return
  }

  // 开始录音...
  try {
    errorMessage.value = null
    transcribedText.value = null
    audioData.value = []
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStream.value = stream

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: SAMPLE_RATE,
    })
    audioContext.value = ctx

    const source = ctx.createMediaStreamSource(stream)
    const proc = ctx.createScriptProcessor(4096, 1, 1)
    processor.value = proc

    proc.onaudioprocess = (e) => {
      audioData.value.push(e.inputBuffer.getChannelData(0).slice())
    }

    source.connect(proc)
    proc.connect(ctx.destination)
    isRecording.value = true
  } catch (err: unknown) {
    errorMessage.value = '无法访问麦克风，请检查权限。'
  }
}
</script>
