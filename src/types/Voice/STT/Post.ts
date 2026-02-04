// types/Voice/STT/post.ts

// 请求：FormData 中的 audio 字段（文件）
export interface STTRequest {
  audio: File | Blob
}

// 响应：后端返回结构
export interface STTResponse {
  text: string // 后处理后的识别文本（如："今天天气很好。"）
  raw_text?: string // 可选：原始带空格文本（如："今 天 天 气 很 好"）
  words?: Array<{
    word: string
    start: number
    end: number
    conf: number
  }>
}
