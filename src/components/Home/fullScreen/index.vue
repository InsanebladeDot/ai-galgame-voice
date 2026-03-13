<template>
  <div 
    class="font-sans h-full bg-blue-50 relative selection:bg-sherry-blue selection:text-white flex flex-col overflow-hidden"
  >
    <!-- 背景（绝对定位不干扰布局） -->
    <HomeBackground class="absolute inset-0 z-0" />
    
    <!-- 内容层（确保在背景之上） -->
    <div class="relative z-10 flex flex-col h-full">
      <slot>
        <!-- 自定义区域 -->
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HomeBackground from '@/components/Home/HomeBackground.vue'

</script>