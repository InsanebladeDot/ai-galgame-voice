<template>
  <button
    class="bg-slate-900 text-white rounded-[18px] font-black text-sm shadow-xl shadow-slate-200 hover:bg-pink-500 hover:shadow-pink-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 px-8 py-3.5"
  >
    {{ d.Home.SettingsPage.saveAndClose }}
  </button>
</template>
<script setup lang="ts">
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'

const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)
</script>
