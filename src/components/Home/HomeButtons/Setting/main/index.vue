<!-- Main 组件 (main/index.vue) -->
<template>
  <div class="flex-1 flex flex-col min-w-0 bg-white p-4 md:p-6 overflow-auto">
    <!-- 使用 Suspense 处理异步组件加载状态 -->
    <Suspense>
      <template #default>
        <component :is="currentComponent" v-if="currentComponent" class="w-full " />
      </template>
      <template #fallback>
        <div class="flex items-center justify-center h-full">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  currentComponent?: Component
}>()
</script>