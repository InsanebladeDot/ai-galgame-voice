<template>
  <!-- 背景音乐容器（无实际DOM，仅逻辑控制） -->
  <div class="bgm-controller" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { backgroundList } from "@/Data/voice/brackground/index"

const currentAudio = ref<HTMLAudioElement | null>(null)
const playTimer = ref<number | null>(null)

const props = defineProps({
  bgm: {
    type: String,
    required: false,
    default: backgroundList[0]?.src || ''
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  volume: {
    type: Number,
    default: 0.3, // 背景音乐默认音量30%
    validator: (value: number) => value >= 0 && value <= 1
  }
})

// 播放音频
const playGeneratedAudio = () => {
  // 清除之前的播放定时器
  if (playTimer.value !== null) {
    window.clearTimeout(playTimer.value)
    playTimer.value = null
  }

  if (!currentAudio.value || !props.bgm) return

  // 重置并设置新音频源
  currentAudio.value.pause()
  currentAudio.value.src = props.bgm
  currentAudio.value.volume = props.volume
  currentAudio.value.currentTime = 0

  // 延迟播放避免资源竞争
  playTimer.value = window.setTimeout(() => {
    currentAudio.value?.play().catch(err => {
      console.warn('背景音乐自动播放被阻止:', err)
      // 可选：触发用户交互提示（如显示"点击开始背景音乐"按钮）
    })
  }, 300)
}

// 监听BGM变化
watch(() => props.bgm, (newSrc, oldSrc) => {
  if (newSrc && newSrc !== oldSrc && currentAudio.value) {
    playGeneratedAudio()
  }
})

// 监听音量变化
watch(() => props.volume, (newVol) => {
  if (currentAudio.value) {
    currentAudio.value.volume = Math.max(0, Math.min(1, newVol))
  }
})

// 组件挂载
onMounted(() => {
  currentAudio.value = new Audio()
  currentAudio.value.loop = true // 背景音乐循环播放
  currentAudio.value.preload = 'auto'
  console.log('背景音乐组件已挂载，初始BGM-volume:', props.volume)

  if (props.autoPlay && props.bgm) {
    playGeneratedAudio()
  }
})

// ✅ 组件卸载时彻底清理（关键！）
onUnmounted(() => {
  // 1. 清除播放定时器
  if (playTimer.value !== null) {
    window.clearTimeout(playTimer.value)
    playTimer.value = null
  }

  // 2. 停止并清理音频资源
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.src = ''
    currentAudio.value = null
  }

  // 3. 移除可能的全局事件监听（安全兜底）
  if (typeof window !== 'undefined') {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
})

// 可选：页面关闭前额外保障（双重保险）
const handleBeforeUnload = () => {
  if (currentAudio.value) {
    currentAudio.value.pause()
  }
}
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', handleBeforeUnload)
}

// 暴露控制方法（供父组件调用）
defineExpose({
  play: () => currentAudio.value?.play(),
  pause: () => currentAudio.value?.pause(),
  setVolume: (vol: number) => {
    if (currentAudio.value) {
      currentAudio.value.volume = Math.max(0, Math.min(1, vol))
    }
  }
})
</script>

<style scoped>
.bgm-controller {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>