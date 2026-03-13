// utils/audioPlayer.ts

import { ElMessage } from 'element-plus'

let currentAudio: HTMLAudioElement | null = null

export function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause()
    if (currentAudio.src) {
      URL.revokeObjectURL(currentAudio.src)
    }
    currentAudio = null
  }
}

export async function playAudioBlob(audioBlob: Blob, volume: number = 0.3): Promise<void> {
  // ✅ 先停止上一个（安全中断）
  stopCurrentAudio()

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(audioBlob)
    const audio = new Audio(url)
    //使用系统设置的音量
    audio.volume = volume
    currentAudio = audio // 全局引用

    const cleanup = () => {
      if (currentAudio === audio) {
        URL.revokeObjectURL(url)
        currentAudio = null
      }
    }

    audio.onended = () => {
      cleanup()
      resolve()
    }

    audio.onerror = () => {
      cleanup()
      reject(new Error('音频播放失败'))
    }

    audio.play().catch((err) => {
      if (err.name !== 'AbortError') {
        cleanup()
        reject(new Error('无法播放音频', { cause: err }))
      }
      // 如果是 AbortError，说明被新播放取代，忽略
    })
  })
}
export async function playAudioSRC(audioSrc: string, volume: number = 0.3): Promise<void> {
  // ✅ 先停止上一个（安全中断）
  stopCurrentAudio()
  console.log('Playing audio from src:', audioSrc)
  return new Promise((resolve, reject) => {
    const url = audioSrc
    const audio = new Audio(url)
    //使用系统设置的音量
    audio.volume = volume

    currentAudio = audio // 全局引用

    const cleanup = () => {
      if (currentAudio === audio) {
        URL.revokeObjectURL(url)
        currentAudio = null
      }
    }

    audio.onended = () => {
      cleanup()
      resolve()
    }

    audio.onerror = () => {
      cleanup()
      reject(new Error('音频播放失败'))
    }

    audio.play().catch((err) => {
      if (err.name !== 'AbortError') {
        cleanup()
        reject(new Error('无法播放音频', { cause: err }))
      }
      // 如果是 AbortError，说明被新播放取代，忽略
    })
  })
}

// 传递一个 audio 实例过去 用于 AI生成的语音 原理未知
export const playGeneratedAudio = (currentAudio: HTMLAudioElement, audioUrl: string) => {
  if (!audioUrl) {
    ElMessage.warning('请先生成语音')
    return
  }
  if (currentAudio) {
    currentAudio.src = audioUrl
  }
  setTimeout(() => {
    currentAudio?.play()
  }, 500)
  setTimeout(() => {
    currentAudio?.play()
  }, 10000)
}
