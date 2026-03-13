// composables/useWebSocket.ts
import { ref, onUnmounted, onMounted, readonly, computed } from 'vue'
import { WebSocketClient } from '@/types/web/websocket-client' // ✅ 值导入（运行时需要）
import type { WsOptions, WsStatus,WxMessage } from '@/types/web/websocket-client' // ✅ 仅类型导入

export function useWebSocket(options: WsOptions & { autoConnect?: boolean }) {
  const client = new WebSocketClient(options)
  const status = ref<WsStatus>(client.getStatus())
  const message = ref<WxMessage | null>(null) // ✅ 支持初始为 null
  const error = ref<Event | null>(null)

  // 状态同步（显式标注回调参数类型）
  client.on('onStatusChange', (newStatus: WsStatus) => {
    status.value = newStatus
  })

  client.on('onMessage', (data: unknown) => {
    message.value = data as WxMessage | null // ✅ 类型断言
  })

  client.on('onError', (e: Event) => {
    error.value = e
  })

  // 生命周期
  onMounted(() => {
    if (options.autoConnect !== false) client.connect()
  })

  onUnmounted(() => {
    client.disconnect()
  })

  return {
    // 响应式状态（isConnected 修正为 computed）
    status: readonly(status),
    message: readonly(message),
    error: readonly(error),
    isConnected: computed(() => status.value === 'OPEN'), // ✅ 响应式计算属性

    // 操作（参数类型安全）
    sendMessage: (data: string | Record<string, unknown>) => client.send(data), // ✅ unknown 替代 any
    connect: () => client.connect(),
    disconnect: () => client.disconnect(),

    // 高级：直接访问实例（谨慎使用）
    wsClient: client,
  }
}
