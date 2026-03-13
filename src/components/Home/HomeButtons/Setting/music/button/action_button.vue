<template>
  <div
    class="group relative p-4 rounded-[24px] border-2 transition-all duration-300 flex items-center justify-between bg-orange-50/50 border-orange-200 shadow-lg shadow-orange-100/50 cursor-pointer"
  >
    <div class="flex items-center gap-3 overflow-hidden">
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all bg-orange-500 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-check"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      </div>
      <div class="truncate">
        <p class="font-bold text-sm truncate text-orange-700">{{ label }}</p>
        <p class="text-[10px] text-slate-400 font-medium">{{ description }}</p>
      </div>
    </div>

    <button
      v-if="!isPlaying"
      class="p-2 rounded-full transition-all bg-white text-slate-400 hover:text-orange-500 border border-slate-100 shadow-sm"
      aria-label="预览欢快风格音乐"
      @click="togglePlay()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-play"
        aria-hidden="true"
      >
        <path
          d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
        ></path>
      </svg>
    </button>
    <button
      v-else
      @click="togglePlay()"
      class="p-2 rounded-full transition-all bg-orange-500 text-white shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="white"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-square"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      </svg>
    </button>
  </div>
</template>
<script setup lang="ts">
import { playAudioSRC, stopCurrentAudio } from '@/util/voice/audio/tool'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import { ref } from 'vue'
const systemSeting = useSystemSettingStore()

const props = defineProps<{
  label: string
  description: string
  bgm: string | undefined
}>()

const isPlaying = ref(false)

const togglePlay = () => {
  if (isPlaying.value) {
    stopCurrentAudio()
  } else {
    // 播放音乐
    playAudioSRC(props.bgm || '/assets/audio/bgm.mp3', systemSeting.volume)
    console.log(props.bgm)
  }
  isPlaying.value = !isPlaying.value
}
</script>
