<!-- components/util/Typewriter.vue -->
<template>
  <span>{{ displayedText }}</span>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  fullText: string
  trigger?: boolean // v-model:trigger 的值
}>()

const emit = defineEmits<{
  (e: 'update:trigger', value: boolean): void
  (e: 'next'): void // 打完后通知父组件“可以进下一句”
}>()

const displayedText = ref('')
let currentIndex = 0
let typingTimer: ReturnType<typeof setTimeout> | null = null
let isTypingDone = false

// 清理定时器
const clearTyping = () => {
  if (typingTimer) {
    clearTimeout(typingTimer)
    typingTimer = null
  }
}

// 打字函数
const startTyping = () => {
  clearTyping()
  displayedText.value = ''
  currentIndex = 0
  isTypingDone = false

  const typeNext = () => {
    if (currentIndex < props.fullText.length) {
      displayedText.value += props.fullText[currentIndex]
      currentIndex++
      typingTimer = setTimeout(typeNext, 40)
    } else {
      isTypingDone = true
    }
  }

  typeNext()
}

// 监听 fullText 变化：重启打字
watch(
  () => props.fullText,
  (newText) => {
    if (newText === '') {
      clearTyping()
      displayedText.value = ''
      isTypingDone = true
    } else {
      startTyping()
    }
  },
  { immediate: true }
)

// 监听 trigger 变化（由父组件 v-model 控制）
watch(
  () => props.trigger,
  (newVal) => {
    if (newVal === true) {
      if (!isTypingDone) {
        // 还没打完 → 立即完成
        clearTyping()
        displayedText.value = props.fullText
        isTypingDone = true
      } else {
        // 已打完 → 触发 next
        emit('next')
      }
      // 重置 trigger 为 false（v-model 同步）
      emit('update:trigger', false)
    }
  }
)

onBeforeUnmount(() => {
  clearTyping()
})
</script>