<template>
  <header
    class="relative z-20 px-4 py-4 md:px-12 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
  >
    <div class="flex items-center gap-3 md:gap-6 min-w-0">
      <!-- 返回按钮 -->
      <slot> </slot>

      <!-- 标题区域 -->
      <div class="min-w-0">
        <h1
          class="text-2xl md:text-4xl font-black text-slate-800 tracking-tighter flex items-center gap-2 md:gap-3 italic leading-tight truncate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-book-open text-pink-500 shrink-0"
            aria-hidden="true"
          >
            <path d="M12 7v14"></path>
            <path
              d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
            ></path>
          </svg>
          <span class="truncate">{{ d.Home.SaveManagementPage.title }}</span>
        </h1>
        <p
          class="text-slate-400 font-bold uppercase tracking-[0.2em] text-[8px] md:text-[10px] mt-0.5 ml-0.5 opacity-70"
        >
          {{ d.Home.SaveManagementPage.subtitle }}
        </p>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="flex flex-col gap-3 items-stretch md:items-end">
      <!-- 状态面板 -->
      <div
        class="flex flex-wrap items-center gap-3 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/50 shadow-sm self-start md:self-auto"
      >
        <!-- 导入按钮 -->
        <button
          class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-md group"
        >
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
            class="lucide lucide-download group-hover:-translate-y-0.5 transition-transform"
            aria-hidden="true"
          >
            <path d="M12 15V3"></path>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <path d="m7 10 5 5 5-5"></path>
          </svg>
          <span>{{ d.Home.SaveManagementPage.importButton }}</span>
        </button>

        <!-- 分隔线 -->
        <div class="h-8 w-px bg-slate-200 hidden sm:block"></div>

        <!-- 剧本数量 -->
        <div class="px-4 py-1">
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">剧本</p>
          <p class="text-lg font-black text-slate-700 leading-none">0 / 100</p>
        </div>

        <div class="h-8 w-px bg-slate-200"></div>

        <!-- 状态信息 -->
        <div class="px-4 py-1">
          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">状态</p>
          <p class="text-xs font-black text-green-500 leading-none flex items-center gap-1.5">
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
              class="lucide lucide-sparkles"
              aria-hidden="true"
            >
              <path
                d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
              ></path>
              <path d="M20 2v4"></path>
              <path d="M22 4h-4"></path>
              <circle cx="4" cy="20" r="2"></circle>
            </svg>
            正常
          </p>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="relative w-full md:w-80">
        <input
          type="text"
          value=""
          :placeholder="d.Home.SaveManagementPage.searchPlaceholder"
          class="w-full pl-9 pr-3 py-2 bg-white/80 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
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
          class="lucide lucide-search absolute left-3 top-2.5 text-slate-300"
          aria-hidden="true"
        >
          <path d="m21 21-4.34-4.34"></path>
          <circle cx="11" cy="11" r="8"></circle>
        </svg>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'

const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)
</script>
