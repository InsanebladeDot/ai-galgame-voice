/**
 * 音频流推送器 - 纯函数封装（无任何组件依赖）
 * @param mediaStream 媒体流
 * @param wsClient WebSocket客户端实例
 * @param isRecordingGetter 状态获取器：() => boolean
 * @returns 清理函数（调用即停止推送并释放资源）
 */
export const startAudioStreamPush = (
  mediaStream: MediaStream,
  wsClient: { socket?: WebSocket | null },
  isRecordingGetter: () => boolean,
): (() => void) => {
  // 验证必要条件
  if (!mediaStream || !wsClient.socket) {
    console.error('❌ 音频流推送失败: 媒体流或 WebSocket 未就绪')
    return () => {} // 安全返回空清理函数
  }

  try {
    // 创建16kHz音频上下文
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    const context = new AudioContext({ sampleRate: 16000 })
    const source = context.createMediaStreamSource(mediaStream)
    const processor = context.createScriptProcessor(4096, 1, 1)

    // 核心：持续推送音频流
    processor.onaudioprocess = (e) => {
      // 通过getter实时获取最新状态（避免闭包陷阱）
      if (!isRecordingGetter() || !wsClient.socket) return

      const inputData = e.inputBuffer.getChannelData(0)
      const buffer = new ArrayBuffer(inputData.length * 2)
      const view = new DataView(buffer)

      // Float32 → 16-bit PCM (小端序)
      for (let i = 0; i < inputData.length; i++) {
        const s = Math.max(-1, Math.min(1, inputData[i]))
        view.setInt16(i * 2, s < 0 ? s * 32768 : s * 32767, true)
      }

      // 仅向OPEN状态的WebSocket发送
      if (wsClient.socket.readyState === WebSocket.OPEN) {
        wsClient.socket.send(buffer)
      }
    }

    // 连接音频处理链
    source.connect(processor)
    processor.connect(context.destination)

    console.log('🔊 音频流推送已启动 (16kHz)')

    // ===== 返回清理函数（关键：闭包持有所有资源）=====
    return () => {
      // 1. 断开音频处理链
      processor.onaudioprocess = null
      processor.disconnect()
      source.disconnect()

      // 2. 关闭音频上下文
      if (context.state !== 'closed') {
        context.close().catch(() => {})
      }

      console.log('⏹ 音频流推送资源已清理')
    }
  } catch (err) {
    console.error('❌ 音频流推送初始化失败:', err)
    return () => {} // 失败时返回安全清理函数
  }
}
