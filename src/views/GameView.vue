<template>
<div 
  :style="{
    background: `url(${CurConversation.CurConversation?.bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  }"
  class="app-container font-sans bg-blue-50 relative selection:bg-sherry-blue selection:text-white"
>
  <div class="absolute inset-0 z-0 w-full h-full overflow-hidden">
    <div class="absolute inset-0 z-20 pointer-events-none flex justify-center items-end transition-all duration-1000 opacity-100">
      <div class="
        absolute left-1/2 transform -translate-x-1/2 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) z-20 
        opacity-100 translate-y-0
        h-[95%] bottom-0
        lg:h-[125vh] lg:-bottom-[15vh]
      " style="width: auto; filter: drop-shadow(rgba(255, 255, 255, 0.3) 0px 0px 15px);">
        <div class="relative h-full scale-100 animate-breathe transition-transform duration-500">
          <img :alt="roleStore.role?.name" class="h-full w-auto object-contain transition-all duration-500 ease-in-out" :src="CurConversation.CurConversation?.currentAction">
        </div>
      </div>
    </div>
    
    <div class="absolute inset-0 z-50 pointer-events-none flex flex-col justify-end transition-all duration-1000 transform opacity-100 translate-y-0">
      <div class="w-full p-2 md:p-6 lg:pb-8 lg:px-24 flex justify-center items-end font-sans pointer-events-none">
       <ChatBox/>
      </div>
    </div>
    
    <div class="absolute top-6 right-6 z-40 flex gap-2">
        <el-button
          v-for="(item, index) in buttons"
          :key="index"
          :icon="item.icon"
          size="large"
          circle
          class="!bg-black/10  !text-gray-400 hover:!bg-white hover:!text-blue-500 !border-0 transition-colors"
        />
    </div>

    <!-- 喇叭触发模仿声音 -->
      <VioceButton   />

  </div>
</div>
</template>
<script setup lang="ts">
import ChatBox from '@/components/Load/game/ChatBox.vue'
import VioceButton from '@/components/Load/game/Voice/button.vue'
import { Setting, RefreshRight, Microphone } from '@element-plus/icons-vue'
import { useRoleStore } from '@/stores/Roles/Role'
import { useCurConversationStore } from '@/stores/story/Cur_conversation'
const CurConversation = useCurConversationStore()
const roleStore = useRoleStore()
const buttons = [
  { label: '设置', icon: Setting },
  { label: '音量', icon: Microphone },
  { label: '重置', icon: RefreshRight }
]
</script>