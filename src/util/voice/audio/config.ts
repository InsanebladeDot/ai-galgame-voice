import type { TTSPayload } from '@/types/Voice/TTS/Post'

export const PostTTS: TTSPayload = {
  refer_wav_path:
    'F:\\AI\\GPT-SoVITS\\GPT-SoVITS-Test-resource\\module\\爱莉希雅\\参考音频\\【正常】哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错.wav',
  prompt_text: '哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错',
  prompt_language: 'zh',
  text_language: 'zh',
  text: '哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错',
}

// 仅保留纯文本默认值（路径由业务层传入）
export const DEFAULT_TTS_CONFIG = {
  prompt_text: '哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错',
  prompt_language: 'zh' as const,
  text_language: 'zh' as const,
}

/**
 * 生成 TTS 请求参数（安全版）
 * @param text - 必填：待合成文本
 * @param options - 可选配置
 */
export const getTTSFormat = (
  text?: string,
  options?: {
    refer_wav_path?: string
    prompt_text?: string
    prompt_language?: string
    text_language?: string
  },
): TTSPayload => {
  // 合并默认值（空字符串也会被替换）
  const promptText = options?.prompt_text || DEFAULT_TTS_CONFIG.prompt_text
  const promptLang = options?.prompt_language || DEFAULT_TTS_CONFIG.prompt_language
  const textLang = options?.text_language || DEFAULT_TTS_CONFIG.text_language
  text = text || DEFAULT_TTS_CONFIG.prompt_text
  return {
    refer_wav_path: options?.refer_wav_path || '', // 路径必须由调用方保证有效
    prompt_text: promptText,
    prompt_language: promptLang,
    text_language: textLang,
    text: text.trim() || promptText, // 防空处理
  }
}
