<template>
  <div class="w-full h-full flex items-center justify-center p-4">
    <!-- OML2D 挂载容器 -->
    <div ref="oml2dRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { loadOml2d, type Options } from 'oh-my-live2d'
import { playAudioBlob } from '@/util/voice/audio/tool'
import { generateTTS } from '@/Api/Voice/TTS/Start/TTS/index'
import type { TTSPayload } from '@/types/Voice/TTS/Post'
import { default_config } from './config/default'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'

const SystemSettings = useSystemSettingStore()

const oml2dRef = ref<HTMLElement | null>(null)
let oml2dInstance: ReturnType<typeof loadOml2d> | null = null

// ✅ 推荐：类型安全 + 默认值
const props = withDefaults(
  defineProps<{
    message?: string
    isAllCustomMade?: boolean //默认为局部替换
    config?: Options
  }>(),
  {
    message: '你好呀～今天过得怎么样？', // 提供默认值
    isAllCustomMade: false,
    config: () => default_config,
  },
)

const PostTTS: TTSPayload = {
  refer_wav_path:
    'F:\\AI\\GPT-SoVITS\\GPT-SoVITS-Test-resource\\module\\爱莉希雅\\参考音频\\【正常】哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错.wav',
  prompt_text: '哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错',
  prompt_language: 'zh',
  text_language: 'zh',
  text: props.message || '你好呀～今天过得怎么样？',
}

onMounted(() => {
  if (!oml2dRef.value) return

  // 初始化 OML2D 全局替换和局部替换
  if (props.isAllCustomMade) {
    oml2dInstance = loadOml2d(props.config)
  } else {
    oml2dInstance = loadOml2d({
      dockedPosition: props.config.dockedPosition,
      primaryColor: props.config.primaryColor,
      parentElement: oml2dRef.value,
      models: props.config.models,
    })
  }

  oml2dInstance.onLoad((status) => {
    console.log('[OML2D] Load status:', status)
  })

  oml2dInstance.onStageSlideIn(() => {
    showTips(props.message)
  })

  // 绑定点击事件（确保元素存在）
  const attachClick = () => {
    const stage = oml2dRef.value?.querySelector('#oml2d-stage')
    if (stage) {
      stage.addEventListener('click', () => {
        showTips(props.message)
      })
    } else {
      setTimeout(attachClick, 100)
    }
  }
  attachClick()
})

const showTips = async (msg: string) => {
  oml2dInstance?.tipsMessage(msg, 4000, 10)
  // ttsTransformer()
}

//tts 转换
const ttsTransformer = async () => {
  const res = await generateTTS(PostTTS)
  playAudioBlob(res.data, SystemSettings.volume)
}
</script>
