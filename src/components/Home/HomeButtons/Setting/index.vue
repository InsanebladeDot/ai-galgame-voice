<!-- 父组件 (App.vue) -->
<template>
  <div
    class="md:w-full bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-[2px] md:border-[4px] border-white ring-2 ring-pink-200 overflow-hidden flex flex-row transform transition-all scale-100 h-[85dvh] md:h-[70vh]"
  >
    <Sidebar
      :menu-items="menuItems"
      :active-id="activeMenuItemId"
      @select-menu="handleMenuSelect"
    />

    <main class="h-full w-full flex flex-col">
      <Main
        class="flex-1 overflow-y-auto custom-scrollbar overscroll-y-contain p-4 md:p-10"
        :current-component="currentComponent"
      />
      <div class="bg-white border-t border-slate-50 flex shrink-0 p-4 md:p-8 justify-end">
        <save_button />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import Sidebar from './sidebar/index.vue'
import Main from './main/index.vue'
import save_button from './music/button/save_button.vue'
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'

const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)

// 菜单项配置（使用 defineAsyncComponent 实现懒加载）
const menuItems = [
  {
    id: 'settings',
    label: d.Home.SettingsPage.title,
    title: '系统设置',
    icon: 'settings',
    component: defineAsyncComponent(() => import('./Base/setting.vue')),
  },
  {
    id: 'ai-settings',
    label: d.Home.SettingsPage.aiSettings,
    title: 'AI高级设置',
    icon: 'sparkles',
    component: defineAsyncComponent(() => import('./module/defined_model.vue')),
  },
  {
    id: 'music-settings',
    label: d.Home.SettingsPage.musicSettings,
    title: '音乐偏好设置',
    icon: 'music',
    component: defineAsyncComponent(() => import('./music/index.vue')),
  },
]

// 当前激活的菜单项ID（默认第一个）
const activeMenuItemId = ref('settings')

// 根据激活ID计算当前应显示的组件
const currentComponent = computed(() => {
  return menuItems.find((item) => item.id === activeMenuItemId.value)?.component
})

// 处理菜单选择
const handleMenuSelect = (id: string) => {
  activeMenuItemId.value = id
  // 可添加滚动到顶部等逻辑
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
