/**
 * 麦克风工具集 - 严格遵循浏览器安全策略
 * ⚠️ 必须在用户交互事件（click/tap）中调用！
 */

import type { WebSocketClient } from '@/types/web/websocket-client'

/**
 * 启动麦克风（核心方法）
 * @param config 音频配置（可选）
 * @returns Promise<MediaStream> 麦克风媒体流
 * @throws Error 权限拒绝/设备缺失/浏览器不支持等
 */
export const startMicrophone = async (
  config: {
    sampleRate?: number
    channelCount?: number
    echoCancellation?: boolean
    noiseSuppression?: boolean
    autoGainControl?: boolean
  } = {},
): Promise<MediaStream> => {
  // 1. 浏览器兼容性检查
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('当前浏览器不支持麦克风访问，请使用 Chrome/Firefox/Edge 最新版')
  }

  // 2. 合并默认配置
  const audioConstraints = {
    echoCancellation: config.echoCancellation ?? true,
    noiseSuppression: config.noiseSuppression ?? true,
    autoGainControl: config.autoGainControl ?? true,
    sampleRate: config.sampleRate ?? 16000,
    channelCount: config.channelCount ?? 1,
    ...config, // 允许覆盖
  }

  // 3. 请求麦克风权限（必须在用户交互上下文中！）
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: audioConstraints,
      video: false,
    })

    // 4. 验证流有效性
    if (!stream.getAudioTracks().length) {
      stream.getTracks().forEach((track) => track.stop())
      throw new Error('未检测到可用的音频轨道')
    }

    // 5. 添加流关闭保护（防止意外泄漏）
    stream.addEventListener('inactive', () => {
      console.warn('⚠️ 麦克风流意外终止（可能被系统回收）')
    })

    console.log('✅ 麦克风已启动 | 采样率:', audioConstraints.sampleRate, 'Hz')
    return stream
  } catch (err) {
    // 6. 精准错误分类（便于调用方处理）
    if (err instanceof DOMException) {
      switch (err.name) {
        case 'NotAllowedError':
          throw new Error('用户拒绝麦克风权限，请点击地址栏授权')
        case 'NotFoundError':
          throw new Error('未检测到麦克风设备，请检查硬件连接')
        case 'NotReadableError':
          throw new Error('麦克风被其他程序占用，请关闭占用程序后重试')
        case 'OverconstrainedError':
          throw new Error('音频参数不被设备支持，请调整配置')
        default:
          throw new Error(`麦克风错误: ${err.message}`)
      }
    }
    throw err
  }
}

/**
 * 停止麦克风流（资源清理）
 * @param stream 要停止的 MediaStream
 */
export const stopMicrophone = (stream: MediaStream | null): void => {
  if (!stream) return
  stream.getTracks().forEach((track) => {
    if (track.readyState === 'ended') return
    track.stop()
    console.log('⏹ 麦克风轨道已停止:', track.label)
  })
}

/**
 * 检查麦克风权限状态（实验性，非所有浏览器支持）
 * @returns Promise<'granted' | 'denied' | 'prompt' | 'unsupported'>
 */
export const checkMicrophonePermission = async (): Promise<string> => {
  if (!('permissions' in navigator)) return 'unsupported'

  try {
    const status = await navigator.permissions.query({ name: 'microphone' as any })
    return status.state
  } catch {
    return 'unsupported'
  }
}
