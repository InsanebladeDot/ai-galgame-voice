<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="animate-fade-in-up">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <!-- 音量 -->
      <div class="space-y-2 md:space-y-3">
        <label class="font-bold text-slate-700 flex items-center gap-2 text-xs md:text-sm">
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
            class="lucide lucide-volume2 lucide-volume-2 text-sherry-blue w-3 h-3 md:w-4 md:h-4"
            aria-hidden="true"
          >
            <path
              d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
            ></path>
            <path d="M16 9a5 5 0 0 1 0 6"></path>
            <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
          </svg>
          {{ d.Home.SettingsPage.volume }}
        </label>
        <input
          min="0"
          max="1"
          step="0.05"
          class="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-sherry-blue"
          type="range"
          v-model="systemSettingStore.volume"
        />
      </div>

      <!-- 文字速度 -->
      <div class="space-y-2 md:space-y-3">
        <label class="font-bold text-slate-700 flex items-center gap-2 text-xs md:text-sm">
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
            class="lucide lucide-type text-sherry-orange w-3 h-3 md:w-4 md:h-4"
            aria-hidden="true"
          >
            <path d="M12 4v16"></path>
            <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"></path>
            <path d="M9 20h6"></path>
          </svg>
          {{ d.Home.SettingsPage.textSpeed }}
        </label>
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-turtle text-slate-400"
            aria-hidden="true"
          >
            <path
              d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"
            ></path>
            <path d="M4.82 7.9 8 10"></path>
            <path d="M15.18 7.9 12 10"></path>
            <path d="M16.93 10H20a2 2 0 0 1 0 4H2"></path>
          </svg>
          <input
            min="10"
            max="100"
            step="5"
            class="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-sherry-orange"
            type="range"
            v-model="systemSettingStore.textSpeed"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-zap text-sherry-orange fill-current"
            aria-hidden="true"
          >
            <path
              d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- 语言选择 -->
    <div class="pt-2 space-y-2 md:space-y-3">
      <label class="font-bold text-slate-700 flex items-center gap-2 text-xs md:text-sm">
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
          class="lucide lucide-globe text-green-500 w-3 h-3 md:w-4 md:h-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
        {{ d.Home.SettingsPage.language }}
      </label>
      <div class="flex gap-2">
        <!--         eslint-disable-next-line vue/require-v-for-key -->
        <button
          v-for="value in languages"
          class="flex-1 py-1.5 md:py-2 rounded-xl border-2 font-bold text-xs md:text-sm transition-all"
          :class="
            systemSettingStore.language === value.code
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-green-300'
          "
          @click="systemSettingStore.language = value.code"
        >
          {{ value.label }}
        </button>
      </div>
    </div>

    <!-- AI 输出语言 -->
    <div class="pt-2 space-y-2 md:space-y-3">
      <label class="font-bold text-slate-700 flex items-center gap-2 text-xs md:text-sm">
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
          class="lucide lucide-type text-indigo-500 w-3 h-3 md:w-4 md:h-4"
          aria-hidden="true"
        >
          <path d="M12 4v16"></path>
          <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"></path>
          <path d="M9 20h6"></path>
        </svg>
        {{ d.Home.SettingsPage.aiOutputLanguage }}
      </label>
      <input
        v-model="systemSettingStore.aiOutputLanguage"
        placeholder="default"
        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs md:text-sm text-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        type="text"
      />
      <p class="text-[10px] md:text-xs text-slate-400">
        {{ d.Home.SettingsPage.aiOutputLanguagePlaceholder }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)

const languages = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ru', label: 'Русский' },
]
</script>

<style lang="css">
@import url(@/assets/styles/anime.css);
</style>
