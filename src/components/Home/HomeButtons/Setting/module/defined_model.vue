<template>
  <div 
    class="rounded-[32px] border-2  flex flex-col transition-all ease-in-out  animate-fade-in-up"
    :class="systemSettingStore.customAiModelEnabled 
      ? 'bg-purple-50/50 border-purple-200 shadow-lg shadow-purple-100/50' 
      : 'bg-slate-50 border-slate-100 opacity-60'">
    
    <defined_model_header class="p-6 pb-0" />
    
    <defined_model_main  class="p-6 pt-0 duration-700 " 
    :class="systemSettingStore.customAiModelEnabled ? 'max-h-[500px] ':'max-h-[0px] opacity-0 '"
    />

    <hint class="m-6 mt-0"/>
  </div>
</template>

<script setup lang="ts">
import defined_model_main from './defined_model_main.vue'
import hint from './hint.vue'
import defined_model_header from './defined_model_header.vue'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'

const systemSettingStore = useSystemSettingStore()
</script>
<style lang="css">
@import url(@/assets/styles/anime.css);
</style>