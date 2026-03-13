import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'

// 创建基础 axios 实例（不设置 baseURL 和 headers）
const ChatInterface = axios.create({
  timeout: 50000,
})

// 请求拦截器：动态设置 baseURL 和 API Key
ChatInterface.interceptors.request.use(
  (config) => {
    const systemSettingStore = useSystemSettingStore()
    const { customAiModelEnabled, customAiModel } = systemSettingStore

    // 1. 动态设置 baseURL
    if (customAiModelEnabled && customAiModel.baseUrl) {
      config.baseURL = customAiModel.baseUrl
    } else {
      config.baseURL = import.meta.env.VITE_API_CHAT_URL
    }

    // 2. 动态设置 API Key
    let apiKey = ''
    if (customAiModelEnabled && customAiModel.apiKey) {
      apiKey = customAiModel.apiKey
    } else {
      apiKey = import.meta.env.VITE_API_KEY
    }

    // 3. 设置认证头（根据平台要求）
    if (apiKey) {
      // 支持两种常见认证方式
      config.headers.Authorization = `Bearer ${apiKey}`
      // 兼容某些平台需要的 X-API-Key
      config.headers['X-API-Key'] = apiKey
    } else {
      console.warn('⚠️ 未配置 API Key，请求可能失败')
    }

    // 4. 验证必要参数
    if (!config.baseURL) {
      ElMessage.warning('未配置 API 地址，请检查系统设置')
      return Promise.reject(new Error('Missing baseURL'))
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器（增强错误处理）
ChatInterface.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 请求失败:', error)

    let message = '请求失败，请稍后重试'
    let showSettingsLink = false

    if (error.response) {
      const status = error.response.status
      const data = error.response.data || {}

      switch (status) {
        case 400:
          message = `参数错误: ${data.detail || data.message || '无效请求'}`
          break
        case 401:
          message = '身份验证失败'
          showSettingsLink = true
          break
        case 403:
          message = '权限不足或 API Key 无效'
          showSettingsLink = true
          break
        case 429:
          message = `请求过于频繁，请 ${data.retry_after ? `等待 ${data.retry_after} 秒后` : ''}重试`
          break
        case 500:
          message = `服务器错误: ${data.message || '内部服务异常'}`
          break
        default:
          message = data.msg || `请求错误 (${status})`
      }
    } else if (error.request) {
      if (error.message.includes('timeout')) {
        message = '请求超时，请检查网络或增加超时时间'
      } else {
        message = '网络连接失败，请检查网络设置'
        showSettingsLink = true
      }
    }

    // 显示错误消息（带设置链接）
    if (showSettingsLink) {
      ElMessage.error({
        message: `${message}，<a href="#" class="text-purple-500 hover:underline" onclick="window.dispatchEvent(new Event('open-settings'))">点击前往设置</a>`,
        dangerouslyUseHTMLString: true,
        duration: 5000,
      })

      // 触发全局事件（在App.vue中监听）
      window.dispatchEvent(
        new CustomEvent('api-auth-failed', {
          detail: { error: message },
        }),
      )
    } else {
      ElMessage.error(message)
    }

    return Promise.reject(error)
  },
)

export default ChatInterface
