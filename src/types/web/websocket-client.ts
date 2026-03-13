// types.ts
export type WsStatus = 'CLOSED' | 'CONNECTING' | 'OPEN' | 'RECONNECTING'
export type WsMessage = string | Record<string, unknown>

// 回调类型定义
export type WsCallback = {
  onOpen: (event: Event) => void
  onMessage: (data: unknown) => void // 严格 unknown
  onError: (event: Event) => void
  onClose: (event: CloseEvent) => void
  onStatusChange: (status: WsStatus) => void
}

export interface WxMessage {
  final: string
  is_speaking: boolean
  partial: string
  rms: number
  timestamp: number
  type: string
}
export interface WsOptions {
  url: string
  reconnectMaxAttempts?: number
  reconnectDelayBase?: number
  heartbeatInterval?: number
  heartbeatTimeout?: number
  heartbeatMessage?: WsMessage
  // pong 识别：字符串匹配 或 自定义校验函数
  pongMessage?: string | ((data: unknown) => boolean)
}

export class WebSocketClient {
  private socket: WebSocket | null = null
  private options: Required<WsOptions>
  private status: WsStatus = 'CLOSED'
  private reconnectCount = 0
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null
  private pongTimer: ReturnType<typeof setTimeout> | null = null
  private messageQueue: WsMessage[] = []
  private isManuallyClosed = false
  private callbacks: {
    [K in keyof WsCallback]: WsCallback[K][]
  } = {
    onOpen: [],
    onMessage: [],
    onError: [],
    onClose: [],
    onStatusChange: [],
  }

  constructor(options: WsOptions) {
    this.options = {
      url: options.url,
      reconnectMaxAttempts: options.reconnectMaxAttempts ?? -1,
      reconnectDelayBase: options.reconnectDelayBase ?? 1000,
      heartbeatInterval: options.heartbeatInterval ?? 30000,
      heartbeatTimeout: options.heartbeatTimeout ?? 10000,
      heartbeatMessage: options.heartbeatMessage ?? { type: 'ping' },
      pongMessage: options.pongMessage ?? 'pong',
    }
  }

  // ===== 公共 API (类型安全) =====
  connect(): void {
    if (this.socket?.readyState === WebSocket.OPEN) return
    this.isManuallyClosed = false
    this.updateStatus('CONNECTING')
    try {
      this.socket = new WebSocket(this.options.url)
      this.bindEvents()
    } catch (e) {
      this.triggerError(new Event('constructor_error'))
    }
  }

  disconnect(): void {
    this.isManuallyClosed = true
    this.clearTimers()
    this.socket?.close()
    this.updateStatus('CLOSED')
  }

  send(data: WsMessage): void {
    const msg = typeof data === 'string' ? data : JSON.stringify(data)
    if (this.status === 'OPEN' && this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(msg)
      // ⚠️ 重要：普通消息不重置 pong 定时器！仅心跳消息触发
    } else {
      this.messageQueue.push(data)
    }
  }

  on<K extends keyof WsCallback>(event: K, cb: WsCallback[K]): void {
    this.callbacks[event].push(cb)
  }

  getStatus(): WsStatus {
    return this.status
  }

  // ===== 内部逻辑 (类型精准) =====
  private bindEvents(): void {
    if (!this.socket) return
    this.socket.onopen = (e) => this.handleOpen(e)
    this.socket.onmessage = (e) => this.handleMessage(e)
    this.socket.onerror = (e) => this.handleError(e)
    this.socket.onclose = (e) => this.handleClose(e)
  }

  private handleOpen(e: Event): void {
    this.reconnectCount = 0
    this.updateStatus('OPEN')
    this.flushMessageQueue()
    this.startHeartbeat()
    this.callbacks.onOpen.forEach((cb) => cb(e))
  }

  private handleMessage(e: MessageEvent): void {
    let data: unknown = e.data
    if (typeof e.data === 'string') {
      try {
        data = JSON.parse(e.data)
      } catch {}
    }

    // 🔍 严格 pong 识别 (类型安全)
    const isPong = (() => {
      if (typeof this.options.pongMessage === 'function') {
        return this.options.pongMessage(data)
      }
      // 字符串匹配：支持原始字符串 或 解析后的 {type: 'pong'}
      return (
        (typeof data === 'string' && data === this.options.pongMessage) ||
        (typeof data === 'object' &&
          data !== null &&
          'type' in data &&
          data.type === this.options.pongMessage)
      )
    })()

    if (isPong) {
      this.clearPongTimer() // 收到 pong，清除超时定时器
      return
    }

    this.callbacks.onMessage.forEach((cb) => cb(data)) // 传递 unknown
  }

  private handleError(e: Event): void {
    this.callbacks.onError.forEach((cb) => cb(e))
  }

  private handleClose(e: CloseEvent): void {
    this.clearTimers()
    this.callbacks.onClose.forEach((cb) => cb(e))

    if (
      !this.isManuallyClosed &&
      (this.options.reconnectMaxAttempts === -1 ||
        this.reconnectCount < this.options.reconnectMaxAttempts)
    ) {
      this.updateStatus('RECONNECTING')
      this.scheduleReconnect()
    } else {
      this.updateStatus('CLOSED')
    }
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.status === 'OPEN') {
        this.send(this.options.heartbeatMessage) // 发送心跳
        this.startPongTimer() // 启动 pong 超时监听
      }
    }, this.options.heartbeatInterval)
  }

  private startPongTimer(): void {
    this.clearPongTimer()
    this.pongTimer = setTimeout(() => {
      console.warn('[WS] Heartbeat timeout, forcing reconnect...')
      this.socket?.close() // 触发 onClose -> 重连
    }, this.options.heartbeatTimeout)
  }

  private clearPongTimer(): void {
    if (this.pongTimer) {
      clearTimeout(this.pongTimer)
      this.pongTimer = null
    }
  }

  private scheduleReconnect(): void {
    const delay = Math.min(
      this.options.reconnectDelayBase * Math.pow(2, this.reconnectCount),
      30000,
    )
    this.reconnectCount++
    setTimeout(() => this.connect(), delay)
  }

  private flushMessageQueue(): void {
    // 安全遍历：避免 flush 过程中队列被修改导致问题
    const queue = [...this.messageQueue]
    this.messageQueue = []
    for (const msg of queue) {
      if (this.status !== 'OPEN') break
      this.send(msg)
    }
  }

  private clearTimers(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    this.clearPongTimer()
  }

  private updateStatus(newStatus: WsStatus): void {
    if (this.status === newStatus) return
    this.status = newStatus
    this.callbacks.onStatusChange.forEach((cb) => cb(newStatus))
  }

  private triggerError(e: Event): void {
    this.handleError(e)
    this.handleClose(new CloseEvent('error', { wasClean: false }))
  }
}
