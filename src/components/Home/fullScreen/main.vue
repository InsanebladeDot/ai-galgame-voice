<template>
  <main class="flex h-screen overflow-y-auto bg-transparent  2xl:pl-40 2xl:pr-40 xl:pl-10 xl:pr-10 lg:pl-5 lg:pr-5 md:pl-2 md:pr-2 pl-0 pr-0 pt-8 pb-8"  >
    <!-- 左侧面板：sticky 定位（在 main 滚动容器内粘连） -->
    <div class="flex-1  sticky top-0 self-start h-full pr-8 ">
      <main_card />
    </div>

    <!-- 右侧卡片网格：正常流，随 main 滚动 -->
  <div class="flex-2  grid 
            grid-cols-2       /* <768px: 2列（sm及以下） */
            md:grid-cols-3    /* 768px~1279px: 3列（md/lg） */
            xl:grid-cols-4    /* ≥1280px: 4列（xl/2xl） */
            gap-4 p-4 overflow-y-auto">
  <div 
    v-for="value in 50" 
    :key="value" 
    class="relative w-full pb-[75%]  rounded-lg overflow-hidden">
    <!-- 内容区域（绝对定位填充） -->
    <div class="absolute inset-0 flex items-center justify-center text-white text-sm">
      <Card />
    </div>
  </div>
</div>
  </main>
</template>

<script setup lang="ts">
import Card from './card/index.vue'
import main_card from './card/main_card.vue';
</script>