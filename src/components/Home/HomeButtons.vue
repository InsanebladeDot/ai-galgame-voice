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
  <div v-if="currentItem" class="custom-overlay" @click="closeDialog">
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
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue' // 👈 引入 computed
import HomeButton from './HomeButton.vue'
import PartnerSelector from '@/components/Roles/PartnerSelector.vue'
import Start from '@/components/Home/HomeButtons/Start/index.vue'
import Setting from '@/components/Home/HomeButtons/Setting/index.vue'
import Community from '@/components/Home/HomeButtons/Community/index.vue'
// import TTSGenerator from './HomeButtons/Start/TTSGenerator.vue'
import { useRoleStore } from '@/stores/Roles/Role/index'

const roleStore = useRoleStore()

// ✅ 改为 computed，响应 role 变化
const dialogButtons = computed(() => [
  {
    id: 'start',
    isPrimary: true,
    mainText: '开始',
    subText: 'Start Game',
    dialogTitle: 'TTS 转换',
    component: Start,
  },
  {
    id: 'partner',
    isPrimary: false,
    mainText: '搭档',
    // ✅ 动态获取当前角色名，支持 undefined 回退
    subText: roleStore.role?.name || 'Nene',
    dialogTitle: '选择角色',
    component: PartnerSelector,
  },
  {
    id: 'settings',
    isPrimary: false,
    mainText: '设置',
    subText: 'Settings',
    dialogTitle: '游戏设置',
    component: Setting,
  },
  {
    id: 'community',
    isPrimary: false,
    mainText: '社群',
    subText: 'Community',
    dialogTitle: '加入社群',
    component: Community,
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
  background-color: rgba(244, 114, 182, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
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
