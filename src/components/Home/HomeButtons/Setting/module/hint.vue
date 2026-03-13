<template>
  <!-- 温馨提示与免责声明 -->
  <div class="bg-yellow-50 border border-yellow-100 rounded-xl p-3 md:p-4">
    <h4 class="flex items-center gap-2 text-yellow-600 font-bold text-xs md:text-sm mb-1 md:mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-shield-alert"
        aria-hidden="true"
      >
        <path
          d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        ></path>
        <path d="M12 8v4"></path>
        <path d="M12 16h.01"></path>
      </svg>
      {{ d.Home.SettingsPage.warningTitle }}
    </h4>
    <p
      v-for="(line, index) in d.Home.SettingsPage.warningContent"
      :key="index"
      class="text-[10px] md:text-xs text-yellow-700/80 leading-relaxed"
    >
      {{ line }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)
</script>
