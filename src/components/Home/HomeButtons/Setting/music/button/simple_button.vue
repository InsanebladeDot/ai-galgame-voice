<template>
    <div 
          class="group relative p-4 rounded-[24px] border-2 transition-all duration-300 flex items-center justify-between bg-white border-slate-100 hover:border-orange-100 cursor-pointer"
        >
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all bg-slate-100 text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music" aria-hidden="true">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
            <div class="truncate">
              <p class="font-bold text-sm truncate text-slate-600">{{ label }}</p>
              <p class="text-[10px] text-slate-400 font-medium">{{ description }}</p>
            </div>
          </div>
           <button 
              disabled
              class="p-2 rounded-full transition-all bg-white text-slate-400 border border-slate-100 shadow-sm opacity-50 cursor-not-allowed"
              aria-label="预览欢快风格音乐"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play" aria-hidden="true">
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
            </svg>
          </button>
    </div>
</template>
<script setup lang="ts">
const  props = defineProps<{
  label: string
  description: string
  bgm: string|undefined
}>()


</script>