<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-8 custom-scrollbar">
    <!-- 音量 & 文字速度 -->
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
          音量
        </label>
        <input
          min="0"
          max="1"
          step="0.05"
          class="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-sherry-blue"
          type="range"
          v-model="volume"
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
          文字速度
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
            v-model="textSpeed"
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
          class="lucide lucide-globe text-green-500 w-3 h-3 md:w-4 md:h-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
        语言 (Language)
      </label>
      <div class="flex gap-2">
        <button
          class="flex-1 py-1.5 md:py-2 rounded-xl border-2 font-bold text-xs md:text-sm transition-all"
          :class="
            language === 'zh'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-green-300'
          "
          @click="setLanguage('zh')"
        >
          中文
        </button>
        <button
          class="flex-1 py-1.5 md:py-2 rounded-xl border-2 font-bold text-xs md:text-sm transition-all"
          :class="
            language === 'en'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-green-300'
          "
          @click="setLanguage('en')"
        >
          English
        </button>
        <button
          class="flex-1 py-1.5 md:py-2 rounded-xl border-2 font-bold text-xs md:text-sm transition-all"
          :class="
            language === 'ja'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-green-300'
          "
          @click="setLanguage('ja')"
        >
          日本語
        </button>
        <button
          class="flex-1 py-1.5 md:py-2 rounded-xl border-2 font-bold text-xs md:text-sm transition-all"
          :class="
            language === 'ru'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-green-300'
          "
          @click="setLanguage('ru')"
        >
          Русский
        </button>
      </div>
    </div>

    <!-- AI 输出语言 -->
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
          class="lucide lucide-type text-indigo-500 w-3 h-3 md:w-4 md:h-4"
          aria-hidden="true"
        >
          <path d="M12 4v16"></path>
          <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"></path>
          <path d="M9 20h6"></path>
        </svg>
        AI 输出语言
      </label>
      <input
        v-model="aiOutputLanguage"
        placeholder="default"
        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs md:text-sm text-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
        type="text"
      />
      <p class="text-[10px] md:text-xs text-slate-400">
        留空或填 default 表示跟随网站语言，也可填写 English、French 等
      </p>
    </div>

    <!-- 分割线 -->
    <div class="h-px bg-slate-100 w-full"></div>

    <!-- 自定义 AI 模型 -->
    <div class="space-y-3 md:space-y-4">
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
          自定义 AI 模型
        </h3>
        <label class="relative inline-flex items-center cursor-pointer scale-75 md:scale-100">
          <input v-model="isCustomModelEnabled" class="sr-only peer" type="checkbox" />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"
          ></div>
        </label>
      </div>

      <!-- ✅ 始终显示，但根据开关状态启用/禁用 -->
      <div
        class="space-y-3 transition-all duration-300"
        :class="{
          'opacity-50 pointer-events-none grayscale': !isCustomModelEnabled,
          'opacity-100 pointer-events-auto': isCustomModelEnabled,
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
            <input
              v-model="baseUrl"
              placeholder="https://api.openai.com/v1"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs md:text-sm text-slate-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
              type="text"
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
            <input
              v-model="apiKey"
              placeholder="sk-..."
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs md:text-sm text-slate-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all pr-10"
              type="password"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-500"
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
                class="lucide lucide-eye"
                aria-hidden="true"
              >
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                ></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
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
              class="lucide lucide-hard-drive"
              aria-hidden="true"
            >
              <line x1="22" x2="2" y1="12" y2="12"></line>
              <path
                d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
              ></path>
              <line x1="6" x2="6.01" y1="16" y2="16"></line>
              <line x1="10" x2="10.01" y1="16" y2="16"></line>
            </svg>
            Model Name
          </label>
          <input
            v-model="modelName"
            placeholder="gemini-1.5-flash"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs md:text-sm text-slate-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            type="text"
          />
        </div>
      </div>
    </div>

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
        温馨提示与免责声明
      </h4>
      <p class="text-[10px] md:text-xs text-yellow-700/80 leading-relaxed whitespace-pre-line">
        1. 您的 API Key 将通过加密 HTTPS 请求发送至我们的服务器用于请求转发。本站不会存储您的任何
        Key 或对话数据。<br />
        2. 建议使用设置了额度限制的 Key，如果可以，强烈建议给您的key设置IP白名单。<br />
        3.
        如因使用第三方模型产生的费用或账号封禁风险，或导致key的泄露，本站不承担任何责任。开启此项即表示您已阅读并同意。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 数据绑定
const volume = ref(0.3)
const textSpeed = ref(80)
const language = ref('zh')
const aiOutputLanguage = ref('')
const isCustomModelEnabled = ref(false)
const baseUrl = ref('https://api.openai.com/v1')
const apiKey = ref('')
const modelName = ref('gemini-1.5-flash')

// 切换语言
const setLanguage = (lang: string) => {
  language.value = lang
}
</script>

<style scoped>
/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5da;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
