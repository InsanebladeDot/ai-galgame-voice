let audioUnlocked = false

/**
 * 浏览器音频解锁（必须在用户交互事件中同步调用）
 * @returns 是否已解锁
 */
export const unlockAudio = (): boolean => {
  if (audioUnlocked) return true

  try {
    // 10ms 静音WAV (base64)
    const silentWav =
      'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='
    const audio = new Audio(silentWav)
    audio.volume = 0.01 // 极低音量避免干扰

    // 同步触发play（关键！必须在用户事件处理函数内）
    audio
      .play()
      .then(() => {
        console.log('[🔊] 音频权限已解锁')
        audioUnlocked = true
        setTimeout(() => audio.remove(), 100)
        return true
      })
      .catch((err) => {
        console.warn('[🔇] 音频解锁失败:', err?.name)
        return false
      })
    return true // 调用即视为尝试解锁
  } catch (e) {
    console.error('[🔇] unlockAudio异常:', e)
    return false
  }
}

// 全局兜底：监听页面首次交互（防遗漏）
if (typeof document !== 'undefined') {
  const unlockHandler = () => {
    unlockAudio()
    document.removeEventListener('click', unlockHandler)
    document.removeEventListener('touchstart', unlockHandler)
  }
  document.addEventListener('click', unlockHandler, { once: true })
  document.addEventListener('touchstart', unlockHandler, { once: true })
}
