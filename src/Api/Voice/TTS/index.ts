import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const VoiceInterface = axios.create({
  timeout: 500000,
})

// 请求拦截器
VoiceInterface.interceptors.request.use(
  (config) => {
    const systemSettingStore = useSystemSettingStore()
    const { customAiModelEnabled, customAiModel } = systemSettingStore
    
    // 1. 动态设置 TTS baseURL
    if (customAiModelEnabled && customAiModel.ttsBaseUrl) {
      config.baseURL = customAiModel.ttsBaseUrl
    } else {
      config.baseURL = import.meta.env.VITE_API_VOICE_TTS_URL || ''
    }


    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// ✅ 响应拦截器：处理错误并弹出 Element Plus 消息
VoiceInterface.interceptors.response.use(
  // 成功响应（status 2xx）
  (response) => {
    // 可选：如果后端使用 { code, data, msg } 结构，可在此统一处理业务错误
    // 例如：
    // if (response.data.code !== 200) {
    //   ElMessage.error(response.data.msg || '请求失败');
    //   return Promise.reject(new Error(response.data.msg));
    // }
    return response
  },
  // ❌ 请求失败（网络错误、超时、4xx/5xx 等）
  (error) => {
    console.error('API 请求失败:', error)

    let message = '请求失败，请稍后重试'

    // 判断错误类型
    if (error.response) {
      // 服务器返回了状态码（如 400, 401, 500）
      const status = error.response.status
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '身份验证失败，请重新登录'
          // 可选：跳转到登录页
          // localStorage.removeItem('token');
          // window.location.href = '/login';
          break
        case 403:
          message = '权限不足'
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
      // 请求已发出但无响应（如网络断开、超时）
      message = '网络连接失败，请检查网络'
    } else {
      // 其他错误（如配置错误）
      message = error.message || '未知错误'
    }

    // 弹出 Element Plus 消息提示
    ElMessage.error(message)

    // 如果需要更醒目的提示（比如确认框），可用 ElMessageBox：
    // ElMessageBox.alert(message, '请求失败', {
    //   type: 'error',
    // });

    return Promise.reject(error)
  },
)

export default VoiceInterface
