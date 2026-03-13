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
      <h2 class="text-lg font-bold text-pink-600 mb-4 text-center">
        {{ d.Home.startPage.subtitle }}
      </h2>

      <button
        v-for="(item, index) in Routers"
        :key="index"
        @click="RouteJumpSearch(item.RouterName)"
        :class="item.buttonStyle"
      >
        <div class="flex items-center justify-center gap-2">
          <div v-html="item.icon" />
          <span>{{ item.content }}</span>
        </div>
      </button>

      <p class="text-xs text-gray-500 mt-4 text-center">
        {{ d.Home.startPage.footerText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteJumpSearch } from '@/util/router/index'

import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)

const Routers = [
  {
    RouterName: 'game',
    content: d.Home.startPage.primaryButton,
    icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
    `,
    buttonStyle:
      'w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-medium rounded-xl shadow-md transition-all duration-200',
  },
  {
    RouterName: 'ai_chat',
    content: d.Home.startPage.secondaryButton,
    icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.338-3.12A8.001 8.001 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>`,
    buttonStyle:
      'w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl shadow-md transition-all duration-200 mt-3',
  },
  {
    RouterName: 'vosk_websocket',
    content: '与AI 进行语音对话',
    icon: `<svg t="1772767268992" class="icon w-4 h-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3208" width="200" height="200"><path d="M355.76 85.68A175.808 175.808 0 0 1 496 16c67.616 0 126.368 38.208 155.84 94.192a31.712 31.712 0 0 0 47.872 9.744C731.712 94.736 772.144 80 816 80c105.968 0 192 86.032 192 192s-86.032 192-192 192c-93.36 0-171.232-66.768-188.448-155.12a175.632 175.632 0 0 1-140.144 58.912C459.44 469.328 366.368 544 256 544 123.536 544 16 436.464 16 304S123.536 64 256 64c35.584 0 69.376 7.76 99.76 21.68z" fill="#CBE9EA" p-id="3209"></path><path d="M16 400.8A128.864 128.864 0 0 1 144.8 272h734.4A128.864 128.864 0 0 1 1008 400.8v305.6a128.864 128.864 0 0 1-128.8 128.8h-161.6L809.6 1008 568.8 835.2H144.8A128.864 128.864 0 0 1 16 706.4v-305.6z" fill="#FFD140" p-id="3210"></path><path d="M144.8 835.2c-21.408 0 459.952-30.704 678.288-44.56A112 112 0 0 0 928 678.864V412.064a144 144 0 0 0-42.688-102.32L847.2 272C918.288 272 1008 329.712 1008 400.8v305.6a128.864 128.864 0 0 1-128.8 128.8h-161.6L809.6 1008 568.8 835.2H144.8z" fill="#D9B236" p-id="3211"></path><path d="M288 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF" p-id="3212"></path><path d="M288 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF" p-id="3213"></path><path d="M512 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF" p-id="3214"></path><path d="M736 552m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" fill="#FFFFFF" p-id="3215"></path><path d="M585.616 225.312A120.064 120.064 0 0 1 472 384a119.408 119.408 0 0 1-74.272-25.776A144.048 144.048 0 0 1 272 432c-79.472 0-144-64.528-144-144 0-26.224 7.024-50.832 19.296-72.016" fill="#CBE9EA" p-id="3216"></path><path d="M585.616 225.312c3.264-12.4 6.384 25.152 6.384 38.688 0 66.224-53.776 120-120 120a119.408 119.408 0 0 1-74.272-25.776A144.048 144.048 0 0 1 272 432c-79.472 0-144-64.528-144-144 0-26.224 17.84-96.464 19.296-72.016 10.784 179.808 167.712 183.392 250.432 94.992 67.824 66.656 166.24-3.392 187.888-85.664z" fill="#ADC6C7" p-id="3217"></path></svg>`,
    buttonStyle:
      'w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl shadow-md transition-all duration-200 mt-3',
  },
]
</script>
