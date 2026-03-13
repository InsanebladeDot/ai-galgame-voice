<template>
  <Header class="shrink-0">
    <button
      @click="
        () => {
          emit('close-dialog')
        }
      "
      class="p-2 md:p-3 bg-white/80 backdrop-blur-md rounded-xl text-slate-400 hover:text-pink-500 hover:shadow-lg transition-all border border-white group shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-chevron-left group-hover:-translate-x-1 transition-transform"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6"></path>
      </svg>
    </button>
  </Header>
  <Main class="flex-1 overflow-y-auto" />
  <Footer class="shrink-0" />
</template>
<script lang="ts" setup>
import Header from '../fullScreen/header.vue'
import Main from '../fullScreen/main.vue' // 修正路径：移除多余点
import Footer from '../fullScreen/footer.vue'

const emit = defineEmits<{
  (e: 'close-dialog'): void
}>()
</script>
