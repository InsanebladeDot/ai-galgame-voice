import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const ChatInterface = axios.create({
  baseURL: import.meta.env.VITE_API_CHAT_URL, // 例如：https://api.siliconflow.cn
  timeout: 50000,
})

// 请求拦截器：自动添加 API Key
ChatInterface.interceptors.request.use(
  (config) => {
    // 从环境变量读取 API Key
    const apiKey = import.meta.env.VITE_API_KEY

    if (apiKey) {
      // 设置 Authorization 头（适用于 SiliconFlow / OpenAI 等）
      config.headers.Authorization = `Bearer ${apiKey}`
      // 某些平台可能需要 X-API-Key，可按需添加：
      // config.headers['X-API-Key'] = apiKey
    } else {
      console.warn('VITE_API_KEY 未配置，请求可能失败')
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器（保持不变）
ChatInterface.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API 请求失败:', error)

    let message = '请求失败，请稍后重试'

    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '身份验证失败，请检查 API Key 是否正确'
          break
        case 403:
          message = '权限不足或 API Key 无效'
          break
        case 404:
          message = '接口未找到'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = error.response.data?.msg || `请求错误 (${status})`
      }
    } else if (error.request) {
      message = '网络连接失败，请检查网络'
    } else {
      message = error.message || '未知错误'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default ChatInterface
