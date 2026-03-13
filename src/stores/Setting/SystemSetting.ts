// stores/role.ts
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { Chat_modules } from '@/Data/module/AiChatModels'
// 默认配置（与界面选项严格对应）
const DEFAULT_SETTINGS = {
  volume: 30, // 音量 (0-100)
  textSpeed: 70, // 文字速度 (0-100)
  language: '中文', // 界面语言: '中文' | 'English' | '日本語' | 'Русский'
  aiOutputLanguage: 'default', // AI输出语言
  customAiModelEnabled: false, // 自定义AI开关
  customAiModel: {
    // 这里放的是Ai Chat 的默认配置项
    baseUrl: import.meta.env.VITE_API_CHAT_URL || '',
    apiKey: import.meta.env.VITE_API_KEY || '',
    modelName: Chat_modules['中（平衡）'][0].id, // 默认选第一个中（平衡）模型
    ttsBaseUrl: import.meta.env.VITE_API_VOICE_TTS_URL || '',
    sttStreamBaseUrl: import.meta.env.VITE_API_VOICE_STT_STREAM_URL || '',
  },
}

export const useSystemSettingStore = defineStore(
  'SystemSettingStore',
  () => {
    // 响应式状态（使用reactive管理嵌套对象更安全）
    const volume = ref(DEFAULT_SETTINGS.volume)
    const textSpeed = ref(DEFAULT_SETTINGS.textSpeed)
    const language = ref(DEFAULT_SETTINGS.language)
    const aiOutputLanguage = ref(DEFAULT_SETTINGS.aiOutputLanguage)
    const customAiModelEnabled = ref(DEFAULT_SETTINGS.customAiModelEnabled)
    const customAiModel = reactive({ ...DEFAULT_SETTINGS.customAiModel })
    // 重置全部设置
    function resetAllSettings() {
      volume.value = DEFAULT_SETTINGS.volume
      textSpeed.value = DEFAULT_SETTINGS.textSpeed
      language.value = DEFAULT_SETTINGS.language
      aiOutputLanguage.value = DEFAULT_SETTINGS.aiOutputLanguage
      customAiModelEnabled.value = DEFAULT_SETTINGS.customAiModelEnabled
      Object.assign(customAiModel, DEFAULT_SETTINGS.customAiModel)
    }

    // 仅重置AI模型配置
    function resetAiModelSettings() {
      Object.assign(customAiModel, DEFAULT_SETTINGS.customAiModel)
      customAiModelEnabled.value = DEFAULT_SETTINGS.customAiModelEnabled
    }

    // 更新单个AI配置项（防误操作）
    function updateAiConfig(key: keyof typeof customAiModel, value: string) {
      if (key in customAiModel) {
        customAiModel[key] = value
      }
    }

    return {
      // 状态
      volume,
      textSpeed,
      language,
      aiOutputLanguage,
      customAiModelEnabled,
      customAiModel,
      // 操作方法
      resetAllSettings,
      resetAiModelSettings,
      updateAiConfig,
    }
  },
  {
    persist: true,
  },
)
