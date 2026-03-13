<template>
  <div class="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
    <!-- 输入区域 -->
    <div class="flex items-center px-3 py-2.5 bg-gray-50 border-t border-gray-100">
      <!-- 左侧：麦克风 / 键盘 切换按钮 -->
      <button
        class="p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
        @click="toggleVoiceMode"
        :disabled="isProcessing"
      >
        <svg
          v-if="!isVoiceMode"
          t="1770052736877"
          class="icon h-4 w-4"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1804"
          width="200"
          height="200"
        >
          <path
            d="M512 128a42.666667 42.666667 0 0 1 42.56 39.466667L554.666667 170.666667v682.666666a42.666667 42.666667 0 0 1-85.226667 3.2L469.333333 853.333333V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m192 128a42.666667 42.666667 0 0 1 42.56 39.466667L746.666667 298.666667v426.666666a42.666667 42.666667 0 0 1-85.226667 3.2L661.333333 725.333333V298.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m-384 0a42.666667 42.666667 0 0 1 42.56 39.466667L362.666667 298.666667v426.666666a42.666667 42.666667 0 0 1-85.226667 3.2L277.333333 725.333333V298.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m576 128a42.666667 42.666667 0 0 1 42.56 39.466667L938.666667 426.666667v170.666666a42.666667 42.666667 0 0 1-85.226667 3.2L853.333333 597.333333v-170.666666a42.666667 42.666667 0 0 1 42.666667-42.666667zM128 384a42.666667 42.666667 0 0 1 42.56 39.466667L170.666667 426.666667v170.666666a42.666667 42.666667 0 0 1-85.226667 3.2L85.333333 597.333333v-170.666666a42.666667 42.666667 0 0 1 42.666667-42.666667z"
            fill="#2E3531"
            p-id="1805"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 14a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>

      <!-- ✅ 修改点：中间容器支持滚动 -->
      <div
        ref="middleContainer"
        class="flex-1 mx-2 relative max-h-[5rem] overflow-y-auto hide-scrollbar"
      >
        <textarea
          v-show="!isVoiceMode"
          v-model="inputValue"
          placeholder="发消息或按住说话..."
          class="w-full min-h-[1.5rem] px-0 py-0 text-sm outline-none bg-transparent placeholder-gray-400 resize-none"
          :disabled="disabled || isProcessing"
          @keyup.enter.exact.prevent="handleSubmit"
        />

        <!-- 全宽声纹覆盖层（仅语音模式） -->
        <div
          v-if="isVoiceMode"
          class="absolute inset-0 flex items-end justify-center gap-[2px] py-0.5 rounded"
          :class="{
            'bg-blue-500': isRecording,
            'bg-orange-400': isRecordingFinished,
          }"
          @touchstart.passive="handlePressStart"
          @mousedown.passive="handlePressStart"
        >
          <div
            v-for="(height, i) in barHeights"
            :key="i"
            class="w-[2px] bg-black rounded-full transition-all duration-100 ease-out"
            :style="{ height: `${height}%` }"
          ></div>
        </div>

        <!-- 语音模式下的提示文字 -->
        <div
          v-if="isVoiceMode && !isRecording && !isRecordingFinished"
          class="w-full flex items-center justify-center text-sm text-gray-600 pointer-events-none"
        >
          按住说话
        </div>
      </div>

      <!-- 右侧：相机（仅键盘模式） -->
      <button
        v-show="!isVoiceMode && !isProcessing"
        class="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
        @click="onCameraClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 4 8zm-4-10v8l-4-4 4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- 顶部工具栏（保持不变） -->
    <div class="flex justify-between items-center px-3 py-1.5 bg-gray-50 border-t border-gray-100">
      <button class="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"></button>
      <div class="flex items-center gap-2">
        <button
          class="px-2 py-0.5 text-xs font-medium text-gray-600 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          自动
        </button>
        <label class="flex items-center cursor-pointer">
          <span class="text-xs text-gray-500 mr-1">语音</span>
          <input type="checkbox" v-model="enableTTS" class="sr-only" />
          <div
            class="relative w-6 h-3 bg-gray-300 rounded-full transition-colors"
            :class="{ 'bg-blue-500': enableTTS }"
          >
            <div
              class="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-full transition-transform"
              :class="{ 'translate-x-3': enableTTS }"
            ></div>
          </div>
        </label>
        <span class="text-xs text-gray-500">52% 使用</span>
        <button
          class="ml-2 p-1 text-gray-500 hover:text-blue-600 focus:outline-none"
          :disabled="!inputValue.trim() || disabled || isProcessing"
          @click="handleSubmit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMessage" class="px-3 py-1 text-red-600 text-xs bg-red-50 border-t">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useVoiceRecorder } from '@/util/voice/STT/tool'

const props = defineProps<{
  disabled?: boolean
  ttsEnabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'send', message: string): void
  (e: 'camera'): void
  (e: 'update:ttsEnabled', value: boolean): void
}>()

// UI State
const inputValue = ref('')
const enableTTS = ref(props.ttsEnabled ?? false)
const isVoiceMode = ref(false)
const isRecordingFinished = ref(false)
const barHeights = ref<number[]>([])
const middleContainer = ref<HTMLDivElement | null>(null)

// 录音逻辑
const {
  isRecording,
  isProcessing,
  errorMessage,
  audioChunks,
  startRecording,
  stopRecording,
  cancelRecording,
  getRmsVolume,
} = useVoiceRecorder()

// Watchers
watch(enableTTS, (val) => {
  emit('update:ttsEnabled', val)
})

// Handlers
const handleSubmit = () => {
  if (inputValue.value.trim() && !props.disabled) {
    emit('send', inputValue.value)
    inputValue.value = ''
  }
}

const onCameraClick = () => {
  emit('camera')
}

// ✅ 核心修复：双向切换
const toggleVoiceMode = () => {
  if (isProcessing.value) return

  if (isVoiceMode.value) {
    // 当前是语音模式 → 切回键盘
    if (isRecording.value) {
      handleCancel()
    } else {
      isVoiceMode.value = false
      resetBars()
    }
  } else {
    // 当前是键盘模式 → 进入语音
    isVoiceMode.value = true
    nextTick(() => {
      calculateBarCount()
    })
  }
}

const calculateBarCount = () => {
  if (!middleContainer.value) return
  const width = middleContainer.value.clientWidth
  const count = Math.floor(width / 4)
  barHeights.value = Array(count).fill(20)
}

const resetBars = () => {
  barHeights.value = barHeights.value.map(() => 20)
}

// 录音控制
let audioInterval: number | null = null

const handlePressStart = async (e: Event) => {
  e.preventDefault()
  if (props.disabled || isProcessing.value) return

  await startRecording()

  audioInterval = window.setInterval(() => {
    if (!isRecording.value || audioChunks.value.length === 0) return
    const latestChunk = audioChunks.value[audioChunks.value.length - 1]
    const volume = getRmsVolume(latestChunk)
    const baseHeight = Math.max(10, volume)
    barHeights.value = barHeights.value.map(() => baseHeight + (Math.random() - 0.5) * 10)
  }, 80)
}

const handlePressEnd = async () => {
  if (!isRecording.value) return

  if (audioInterval) {
    clearInterval(audioInterval)
    audioInterval = null
  }

  const text = await stopRecording()
  isRecordingFinished.value = true

  if (text) {
    emit('send', text)
  }

  resetBars()

  setTimeout(() => {
    isVoiceMode.value = false
    isRecordingFinished.value = false
  }, 1000)
}

const handleCancel = () => {
  if (audioInterval) {
    clearInterval(audioInterval)
    audioInterval = null
  }
  cancelRecording()
  isVoiceMode.value = false
  resetBars()
}

// 全局事件
const handleGlobalEnd = () => {
  if (isRecording.value) {
    handlePressEnd()
  }
}

onMounted(() => {
  window.addEventListener('mouseup', handleGlobalEnd)
  window.addEventListener('touchend', handleGlobalEnd)
  window.addEventListener('resize', calculateBarCount)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', handleGlobalEnd)
  window.removeEventListener('touchend', handleGlobalEnd)
  window.removeEventListener('resize', calculateBarCount)
  if (audioInterval) clearInterval(audioInterval)
})
</script>
