<!-- components/ChoicePopup.vue -->
<template>
  <div class="relative h-full w-full">
    <!-- 装饰：左上角小花 -->
    <div class="absolute top-2 left-4 w-6 h-6 text-pink-300 opacity-80">💐</div>

    <!-- 装饰：右上角小星 -->
    <div class="absolute top-2 right-4 w-5 h-5 text-yellow-300 opacity-70">★</div>

    <!-- 装饰：左下角小花 -->
    <div class="absolute bottom-2 left-4 w-5 h-5 text-pink-200 opacity-60">🌸</div>

    <!-- 装饰：右下角小星 -->
    <div class="absolute bottom-2 right-4 w-5 h-5 text-yellow-200 opacity-60">✨</div>

    <!-- 装饰：顶部中央柔光 -->
    <div
      class="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-pink-200 via-transparent to-pink-200 opacity-50"
    ></div>

    <!-- 装饰：底部中央波浪线 -->
    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-2">
      <svg
        viewBox="0 0 100 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-pink-100"
      >
        <path
          d="M10,10 Q20,0 30,10 T50,10 T70,10 T90,10"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
        />
      </svg>
    </div>

    <!-- 原始内容（保持不变） -->
    <div class="flex flex-col items-center justify-center h-full w-full px-4 py-6">
      <h2 class="text-lg font-bold text-pink-600 mb-4 text-center">请选择你的旅程 ❤️</h2>

      <button
        @click="RouteJumpSearch('game')"
        class="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium rounded-xl shadow-md transition-all duration-200"
      >
        <div class="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span>进入故事章节</span>
        </div>
      </button>

      <button
        @click="RouteJumpSearch('ai_chat')"
        class="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl shadow-md transition-all duration-200 mt-3"
      >
        <div class="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.338-3.12A8.001 8.001 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span>进行 AI 对话</span>
        </div>
      </button>

      <p class="text-xs text-gray-500 mt-4 text-center">
        爱莉希雅会一直在这里，陪你走过每一个选择❤️
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteJumpSearch } from '@/util/router/index'
</script>
