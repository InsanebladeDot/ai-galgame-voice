<!-- src/components/home/HomeCharacter.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    characterImg: string
    dockedPosition?: 'left' | 'center' | 'right'
  }>(),
  {
    dockedPosition: 'right',
  },
)

const positionClasses = computed(() => {
  switch (props.dockedPosition) {
    case 'left':
      return 'left-[-10%] md:left-0 lg:left-[5%]'
    case 'center':
      return 'left-1/2 transform -translate-x-1/2'
    default: // 'right'
      return 'right-[-10%] md:right-0 lg:right-[5%]'
  }
})
</script>

<template>
  <div
    class="absolute bottom-0 h-[85%] md:h-[100%] w-auto z-10 flex items-end justify-center pointer-events-none transition-all duration-500"
    :class="positionClasses"
  >
    <img
      :src="characterImg"
      class="h-full w-auto object-contain object-bottom animate-breathe filter drop-shadow-2xl"
      alt="Character"
    />
  </div>
</template>

<style scoped>
@keyframes breathe-animation {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
.animate-breathe {
  animation: breathe-animation 4s ease-in-out infinite;
}
</style>
