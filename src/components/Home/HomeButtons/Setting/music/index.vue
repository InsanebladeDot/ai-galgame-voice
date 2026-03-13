<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="flex-1 flex flex-col min-w-0 bg-white">
    <div class="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
      <div class="space-y-8 animate-fade-in-up">
        <!-- 音乐设置区域 -->
        <div>
          <h3 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <div class="w-1.5 h-6 bg-orange-500 rounded-full"></div>
            {{ d.Home.SettingsPage.musicSettings }}
          </h3>

          <div class="space-y-6">
            <!-- 预设音乐风格 -->
            <div>
              <h4 class="text-sm font-bold text-slate-600 mb-3">
                {{ d.Home.SettingsPage.presetStyles }}
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- 默认风格 (激活状态) -->

                <!-- 风格们 -->
                <!--                  // eslint-disable-next-line vue/require-v-for-key -->
                <div v-for="(item, index) in backgroundList">
                  <ActionButton
                    v-if="SelectIndex === index"
                    :label="item.name"
                    :description="item.description"
                    :bgm="item.src"
                    @click="SelectIndex = index"
                  />

                  <SimpleButton
                    v-else
                    :label="item.name"
                    :description="item.description"
                    :bgm="item.src"
                    @click="SelectIndex = index"
                  />
                </div>
              </div>
            </div>
            <div class="h-px bg-slate-100 w-full"></div>

            <!-- 自定义上传区域 -->
            <div class="space-y-4">
              <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {{ d.Home.SettingsPage.uploadCustomMusic }}
              </h4>
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto custom-scrollbar pr-2"
              >
                <div
                  class="col-span-1 md:col-span-2 p-6 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-200 transition-all group flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div
                    class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-orange-400 transition-colors"
                  >
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
                      class="lucide lucide-upload"
                      aria-hidden="true"
                    >
                      <path d="M12 3v12"></path>
                      <path d="m17 8-5-5-5 5"></path>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-black text-slate-700 text-sm whitespace-nowrap">
                      {{ d.Home.SettingsPage.supportedFormats }}
                    </h4>
                    <p class="text-xs text-slate-400 mt-1">
                      {{ d.Home.SettingsPage.supportedFormats }}
                    </p>
                  </div>
                  <label
                    class="cursor-pointer bg-white border border-slate-200 hover:border-orange-500 hover:text-orange-500 px-6 py-2 rounded-xl font-bold text-xs transition-all shadow-sm"
                  >
                    <span>Select File</span>
                    <input accept="audio/mpeg,audio/wav,audio/ogg" class="hidden" type="file" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SimpleButton from './button/simple_button.vue'
import ActionButton from './button/action_button.vue'
import { backgroundList } from '@/Data/voice/brackground/index'
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import { ref } from 'vue'
const SelectIndex = ref(0)

const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)
</script>

<style scoped>
@import url(@/assets/styles/anime.css);
</style>
