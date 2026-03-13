<template>
  <div class="flex justify-between items-center">
    <h3 class="font-black text-slate-700 flex items-center gap-2 text-sm md:text-base">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-cpu text-purple-500 w-4 h-4 md:w-5 md:h-5"
        aria-hidden="true"
      >
        <path d="M12 20v2"></path>
        <path d="M12 2v2"></path>
        <path d="M17 20v2"></path>
        <path d="M17 2v2"></path>
        <path d="M2 12h2"></path>
        <path d="M2 17h2"></path>
        <path d="M2 7h2"></path>
        <path d="M20 12h2"></path>
        <path d="M20 17h2"></path>
        <path d="M20 7h2"></path>
        <path d="M7 20v2"></path>
        <path d="M7 2v2"></path>
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <rect x="8" y="8" width="8" height="8" rx="1"></rect>
      </svg>
      {{ d.Home.SettingsPage.customModel }}
    </h3>
    <label class="relative inline-flex items-center cursor-pointer scale-75 md:scale-100">
      <input
        v-model="systemSettingStore.customAiModelEnabled"
        class="sr-only peer"
        type="checkbox"
      />
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"
      ></div>
    </label>
  </div>
</template>
<script setup lang="ts">
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)
</script>
