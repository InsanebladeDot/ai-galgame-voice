<template>
  <div
    class="app-container z-[2001] font-sans bg-blue-50 relative selection:bg-sherry-blue selection:text-white"
  >
    <HomeBackground />
    <HomeTitle />
    <Live2d />
  </div>

  <!-- 悬浮的 AI 聊天小窗（右下角） -->
  <AIChatBox />
</template>

<script setup lang="ts">
import AIChatBox from '@/components/AIChat/Draggable/DraggableAIChat.vue'
import Live2d from '@/oml2d/index.vue'
import HomeBackground from '@/components/Home/HomeBackground.vue'
import HomeTitle from '@/components/Home/HomeTitle.vue'
</script>
