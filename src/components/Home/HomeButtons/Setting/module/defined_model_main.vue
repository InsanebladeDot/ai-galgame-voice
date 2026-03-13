<template>
  <!-- ✅ 始终显示，但根据开关状态启用/禁用 -->
  <div
    class="pt-3 space-y-3"
    :class="{
      ' pointer-events-none grayscale': !systemSettingStore.customAiModelEnabled,
      ' pointer-events-auto': systemSettingStore.customAiModelEnabled,
    }"
  >
    <div class="space-y-1">
      <label
        class="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-link"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        Base URL
      </label>
      <div class="relative">
        <simple_input
          v-model="systemSettingStore.customAiModel.baseUrl"
          :placeholder="systemSettingStore.customAiModel.baseUrl"
        />
      </div>
    </div>

    <div class="space-y-1">
      <label
        class="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-key"
          aria-hidden="true"
        >
          <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path>
          <path d="m21 2-9.6 9.6"></path>
          <circle cx="7.5" cy="15.5" r="5.5"></circle>
        </svg>
        API Key
      </label>
      <div class="relative">
        <hide_input v-model="systemSettingStore.customAiModel.apiKey" placeholder="sk-..." />
      </div>
    </div>

    <model_Select />

    <div class="space-y-1">
      <label
        class="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-link"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        TTS && STT Base URL
      </label>
      <div class="relative">
        <simple_input
          v-model="systemSettingStore.customAiModel.ttsBaseUrl"
          :placeholder="systemSettingStore.customAiModel.ttsBaseUrl"
        />
      </div>
    </div>

    <div class="space-y-1">
      <label
        class="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-link"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        WebSocket Base URL
      </label>
      <div class="relative">
        <simple_input
          v-model="systemSettingStore.customAiModel.sttStreamBaseUrl"
          :placeholder="systemSettingStore.customAiModel.sttStreamBaseUrl"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import simple_input from '../input/simple_input.vue'
import hide_input from '../input/hide_input.vue'
import model_Select from '../module/model_Select.vue'

import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'

const systemSettingStore = useSystemSettingStore()
</script>
