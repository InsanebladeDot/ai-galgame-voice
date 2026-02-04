// api/chat.ts 或类似文件
import ChatInterface from '../../index'

/**
 * 发送聊天消息到 AI 接口
 * @param {Object} payload - 请求体数据
 * @param {string} payload.model - 模型名称，例如 "Pro/zai-org/GLM-4.7"
 * @param {Array<{role: string, content: string}>} payload.messages - 消息列表
 * @param {number} [payload.max_tokens=1024] - 最大生成 token 数
 * @param {boolean} [payload.stream=false] - 是否启用流式响应（当前为普通请求）
 * @returns {Promise<AxiosResponse>}
 */
export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface BeginMessagePayload {
  model: string
  messages: Message[]
  max_tokens?: number
  temperature?: number
  stream?: boolean
}

export const beginMessage = (payload: BeginMessagePayload) => {
  return ChatInterface.post('/v1/messages', payload)
}
