<!-- src/components/home/HomeCharacter.vue -->
<script setup lang="ts">
defineProps<{
  characterImg: string
}>()
</script>

<template>
  <div class="absolute bottom-0 right-[-10%] md:right-0 lg:right-[5%] h-[85%] md:h-[100%] w-auto z-10 flex items-end justify-center pointer-events-none">
    <img 
      :src="characterImg" 
      class="h-full w-auto object-contain object-bottom animate-breathe filter drop-shadow-2xl transition-all duration-500"
      alt="Character"
    />
  </div>
</template>

<style scoped>
/* 定义呼吸动画 */
@keyframes breathe-animation {
  0%, 100% {
    transform: scale(1); /* 初始大小 */
  }
  50% {
    transform: scale(1.02); /* 放大到1.2倍 */
  }
}

/* 应用动画 */
.animate-breathe {
  animation: breathe-animation 4s ease-in-out infinite;
}
</style>