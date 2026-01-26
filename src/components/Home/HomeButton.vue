<!-- src/components/home/HomeButton.vue -->
<template>
  <button 
    class="group relative h-14 w-28 md:h-20 md:w-48 lg:h-24 lg:w-56 transform -skew-x-12 transition-all duration-300 ease-out hover:-translate-y-2 flex flex-col items-center justify-center border-2 shadow-xl"
    :class="buttonClasses"
  >
    <div class="transform skew-x-12 flex flex-col items-center">
      <span 
        class="font-sans font-black text-base md:text-2xl lg:text-3xl tracking-wide drop-shadow-sm"
        :class="mainTextClasses"
      >
        {{ mainText }}
      </span>
      <span 
        class="text-[9px] md:text-[10px] lg:text-xs font-bold tracking-widest uppercase mt-0.5"
        :class="subTextClasses"
      >
        {{ subText }}
      </span>
    </div>
    <div 
      class="absolute top-1 right-1 w-2 h-2 rounded-full"
      :class="indicatorClasses"
    ></div>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  isPrimary: {
    type: Boolean,
    default: false
  },
  mainText: {
    type: String,
    required: true
  },
  subText: {
    type: String,
    default: ''
  }
})

// 主按钮样式（开始）
const primaryClasses = {
  'bg-gradient-to-br from-rose-400 to-pink-600': true,
  'border-white': true,
  'text-white': true,
  'ring-4 ring-rose-100 scale-105': true,
  'hover:shadow-[0_10px_20px_rgba(236,72,153,0.3)]': true
}

// 次要按钮样式（搭档等）
const secondaryClasses = {
  'bg-white/90': true,
  'border-pink-200': true,
  'text-slate-600': true,
  'hover:border-sherry-pink hover:text-sherry-darkPink': true,
  'hover:shadow-[0_10px_20px_rgba(236,72,153,0.3)]': true
}

const buttonClasses = computed(() => ({
  ... (props.isPrimary ? primaryClasses : secondaryClasses),
  // 公共 shadow（primary 已有内联，但为了统一也可放这里）
  'shadow-[0_10px_25px_-5px_rgba(225,29,72,0.4)]': props.isPrimary
}))

const mainTextClasses = computed(() => ({
  'text-white drop-shadow-md': props.isPrimary,
  'group-hover:text-sherry-darkPink': !props.isPrimary
}))

const subTextClasses = computed(() => ({
  'text-pink-100': props.isPrimary,
  'text-gray-400 group-hover:text-pink-400': !props.isPrimary
}))

const indicatorClasses = computed(() => ({
  'bg-white': props.isPrimary,
  'bg-pink-300 opacity-0 group-hover:opacity-100': !props.isPrimary
}))
</script>