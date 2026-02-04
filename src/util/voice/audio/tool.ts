// utils/audioPlayer.ts
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

export async function playAudioBlob(audioBlob: Blob): Promise<void> {
  // ✅ 先停止上一个（安全中断）
  stopCurrentAudio()

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(audioBlob)
    const audio = new Audio(url)
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
