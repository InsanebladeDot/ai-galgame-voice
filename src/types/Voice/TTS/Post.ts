export interface TTSPayload {
  refer_wav_path: string // 后端可访问的绝对路径
  prompt_text: string
  prompt_language: string
  text: string
  text_language: string
}