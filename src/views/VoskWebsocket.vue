<template>
  <div
    class="app-container z-[2001] font-sans bg-blue-50 relative selection:bg-sherry-blue selection:text-white"
  >
    <HomeBackground />
    <Live2d :message="lastAIResponse" :config="olm2d_config" />
    <HomeCharacter :character-img="roleStore.role?.avatar || ''" docked-position="center" />

    <!-- 纯工具 -->
    <Websocket @submit-data="getAiResponce_tts" />
    <AiChat_input
      :placeholder="'和' + roleStore.role?.displayName + '说点什么吧'"
      @submit-data="getSubmit_data"
    />
    <!-- 创建一个看不见的audio -->
    <audio ref="currentAudio" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Live2d from '@/oml2d/index.vue'
import HomeBackground from '@/components/Home/HomeBackground.vue'
import HomeCharacter from '@/components/Home/HomeCharacter.vue'
import AiChat_input from '@/components/vosk_websocket/input/index.vue'
import Websocket from '@/components/vosk_websocket/web/websocket.vue'
import { default_config } from '@/oml2d/config/default'
import type { Options } from 'oh-my-live2d'
import { useRoleStore } from '@/stores/Roles/Role/index'
import { ElMessage } from 'element-plus'
import { playGeneratedAudio } from '@/util/voice/audio/tool'
import { generateTTS } from '@/Api/Voice/TTS/Start/TTS/index'

import type { TTSPayload } from '@/types/Voice/TTS/Post'
const roleStore = useRoleStore()

// 返回ai 回复的最后一句话
const lastAIResponse = ref('')

//配置live2d 的配置项

const olm2d_config = ref<Options>(default_config)
olm2d_config.value.dockedPosition = 'right'

// input 输入框回馈的数据
const getSubmit_data = (data: string) => {
  console.log('输入框的数据', data)
  //收获的 Api操作 后的数据
}

const currentAudio = ref<HTMLAudioElement | null>(null)
//收获Ai回复的数据随后进行tts 转换 转换后 播放声音
const getAiResponce_tts = async (data: string) => {
  console.log('Ai返回的数据', data)

  if (!data) {
    ElMessage.warning('没有可朗读的内容')
    return
  }
  const payload = getTTSConfig(data)
  const response = await generateTTS(payload)

  const audioBlob = response.data as Blob
  const url = URL.createObjectURL(audioBlob)

  if (currentAudio.value) playGeneratedAudio(currentAudio.value, url)
  else console.log('')
}

// 🔊 TTS 配置
const getTTSConfig = (text: string): TTSPayload => ({
  refer_wav_path:
    'F:\\AI\\GPT-SoVITS\\GPT-SoVITS-Test-resource\\module\\爱莉希雅\\参考音频\\【正常】哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错.wav',
  prompt_text: '哎呀真是有趣的设计呢，偶尔尝试下这样的风格也不错',
  prompt_language: 'zh',
  text_language: 'zh',
  text: text,
})
</script>
