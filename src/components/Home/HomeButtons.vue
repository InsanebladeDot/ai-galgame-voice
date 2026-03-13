<!-- src/components/home/HomeButtons.vue -->
<template>
  <div
    class="absolute bottom-4 left-4 z-30 pointer-events-auto origin-bottom-left transition-transform scale-90 md:scale-100"
  >
    <div class="flex flex-wrap items-end gap-2 md:gap-4">
      <HomeButton
        v-for="item in dialogButtons"
        :key="item.id"
        :is-primary="item.isPrimary"
        :main-text="item.mainText"
        :sub-text="item.subText"
        @click="openDialog(item)"
      />
    </div>
  </div>

  <!-- 自定义弹窗 -->
  <div
    v-if="currentItem && !currentItem.ispopUp"
    class="custom-overlay flex items-center justify-center"
    @click="closeDialog"
  >
    <div class="custom-dialog" @click.stop>
      <div class="custom-dialog-header">
        <h3>{{ currentItem.dialogTitle }}</h3>
        <button @click="closeDialog">×</button>
      </div>
      <div class="custom-dialog-body">
        <component :is="currentItem.component" />
      </div>
    </div>
  </div>

  <div
    v-else-if="currentItem && currentItem.fullScreen && currentItem.ispopUp"
    class="custom-overlay"
  >
    <FullScreen>
      <component :is="currentItem.component" @close-dialog="closeDialog" />
    </FullScreen>
  </div>

  <div
    v-else-if="currentItem && currentItem.ispopUp"
    class="custom-overlay flex items-center justify-center"
    @click="closeDialog"
  >
    <div class="custom-dialog" @click.stop>
      <component :is="currentItem.component" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue' // 👈 引入 computed
import { getLocaleDictionary } from '@/util/i18n/i18n_dictionary'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import HomeButton from './HomeButton.vue'
import PartnerSelector from '@/components/Roles/PartnerSelector.vue'
import Saves from './Saves/index.vue'
import Start from '@/components/Home/HomeButtons/Start/index.vue'
import Setting from '@/components/Home/HomeButtons/Setting/index.vue'
import Community from '@/components/Home/HomeButtons/Community/index.vue'
import FullScreen from '@/components/Home/fullScreen/index.vue'

// import TTSGenerator from './HomeButtons/Start/TTSGenerator.vue'
import { useRoleStore } from '@/stores/Roles/Role/index'

const roleStore = useRoleStore()
const systemSettingStore = useSystemSettingStore()
const d = getLocaleDictionary(systemSettingStore.language)

// ✅ 改为 computed，响应 role 变化
const dialogButtons = computed(() => [
  {
    id: 'start',
    isPrimary: true,
    ispopUp: false, //是否仅使用弹窗功能？
    fullScreen: false, // 是否全屏显示（仅对 ispopUp=true 有效）
    mainText: d.Home.Buttons.start,
    subText: 'Start Game',
    dialogTitle: d.Home.startPage.title,
    component: Start,
  },
  {
    id: 'partner',
    isPrimary: false,
    ispopUp: false, //是否仅使用弹窗功能？
    fullScreen: false, // 是否全屏显示（仅对 ispopUp=true 有效）
    mainText: d.Home.Buttons.Role,
    // ✅ 动态获取当前角色名，支持 undefined 回退
    subText: roleStore.role?.name || 'Nene',
    dialogTitle: d.Home.RolePage.title,
    component: PartnerSelector,
  },
  {
    id: 'Saves',
    isPrimary: false,
    ispopUp: true, //是否仅使用弹窗功能？
    fullScreen: true, // 是否全屏显示（仅对 ispopUp=true 有效）
    mainText: d.Home.Buttons.saves,
    subText: 'Save Management',
    dialogTitle: d.Home.SaveManagementPage.title,
    component: Saves,
  },
  {
    id: 'community',
    isPrimary: false,
    ispopUp: false, //是否仅使用弹窗功能？
    fullScreen: false, // 是否全屏显示（仅对 ispopUp=true 有效）
    mainText: d.Home.Buttons.community,
    subText: 'Community',
    dialogTitle: d.Home.CommunityPage.title,
    component: Community,
  },
  {
    id: 'settings',
    isPrimary: false,
    fullScreen: false, // 是否全屏显示（仅对 ispopUp=true 有效）
    mainText: d.Home.Buttons.settings,
    ispopUp: true, //是否仅使用弹窗功能？
    subText: 'Settings',
    dialogTitle: d.Home.SettingsPage.title,
    component: Setting,
  },
])

const currentItem = ref<(typeof dialogButtons.value)[0] | null>(null)

const openDialog = (item: (typeof dialogButtons.value)[0]) => {
  currentItem.value = item
}

const closeDialog = () => {
  currentItem.value = null
}
</script>
<style scoped>
.custom-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
  background-color: rgba(244, 114, 182, 0.6);
}

.custom-dialog {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  /* 默认：桌面端 */
  width: 50%;
  max-width: 1500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.custom-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.custom-dialog-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.custom-dialog-header button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.custom-dialog-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

/* 平板及以下：横屏 or 竖屏都适用 */
@media (max-width: 1024px) {
  .custom-dialog {
    width: 85%;
  }
}

/* 手机小屏（物理宽度 ≤ 768px）*/
@media (max-width: 768px) {
  .custom-dialog {
    width: 95%;
    max-height: 85vh;
  }
}

/* 🔑 关键：当设备处于物理竖屏（portrait）时，
   主容器被 rotate(90deg)，此时视觉上是横屏，
   但为了防止内容过高（因为视觉高度 = 物理宽度），
   我们限制 body 的最大高度为物理宽度（即 vw） */
@media (orientation: portrait) {
  .custom-dialog-body {
    max-height: calc(100vw - 140px); /* 140px ≈ header + padding + 安全区 */
    overflow-y: auto;
  }
}
</style>
