<template>
  <Teleport to="body">
    <div
      ref="chatWindowRef"
      class="app-container fixed z-[2002] rounded-xl shadow-2xl bg-white border border-gray-200 overflow-hidden select-none"
      :style="{
        top: position.y + 'px',
        left: position.x + 'px',
        width: size.width + 'px',
        height: size.height + 'px',
        minWidth: '200px',
        minHeight: '300px',
        maxWidth: '80vw',
        maxHeight: '80vh',
      }"
    >
      <!-- ✅ 8 个手柄 -->
      <div class="resize-handle top" @mousedown.stop="startResize('top')"></div>
      <div class="resize-handle bottom" @mousedown.stop="startResize('bottom')"></div>
      <div class="resize-handle left" @mousedown.stop="startResize('left')"></div>
      <div class="resize-handle right" @mousedown.stop="startResize('right')"></div>
      <div class="resize-handle top-left" @mousedown.stop="startResize('top-left')"></div>
      <div class="resize-handle top-right" @mousedown.stop="startResize('top-right')"></div>
      <div class="resize-handle bottom-left" @mousedown.stop="startResize('bottom-left')"></div>
      <div class="resize-handle bottom-right" @mousedown.stop="startResize('bottom-right')"></div>

      <!-- 标题栏 -->
      <div
        class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-pink-400 to-purple-500 text-white flex items-center justify-center text-sm font-semibold cursor-move z-10"
        @mousedown="startDrag"
      >
        💬 {{ RoleStore.role?.displayName }}的小窗
      </div>

      <AIChatBox style="padding-top: 20px" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import AIChatBox from '@/components/AIChat/ChatBox.vue'
import { useRoleStore } from '@/stores/Roles/Role/index'

const RoleStore = useRoleStore()
const chatWindowRef = ref<HTMLDivElement | null>(null)

const position = reactive({ x: 0, y: 0 })
const size = reactive({ width: 400, height: 500 })

let isDragging = false
let isResizing = false
let resizeDir = ''
let startClientX = 0
let startClientY = 0
let startW = 0
let startH = 0
let startPosX = 0
let startPosY = 0

onMounted(() => {
  setInitialPosition()
  window.addEventListener('resize', setInitialPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', setInitialPosition)
})

function setInitialPosition() {
  const winH = window.innerHeight
  position.x = 100
  position.y = Math.max(0, (winH - size.height) / 2)
}

// 🖱️ 拖拽整个窗口（仅标题栏）
function startDrag(e: MouseEvent) {
  if (isResizing) return // 正在 resize 时禁止 drag
  if (!chatWindowRef.value) return

  e.preventDefault()
  isDragging = true
  const rect = chatWindowRef.value.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  const offsetY = e.clientY - rect.top

  const move = (e: MouseEvent) => {
    if (!isDragging) return
    position.x = e.clientX - offsetX
    position.y = e.clientY - offsetY
  }

  const up = () => {
    isDragging = false
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }

  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}

// 🛡️ 尺寸限制函数
const clampWidth = (w: number): number => Math.max(200, Math.min(w, window.innerWidth * 0.8))
const clampHeight = (h: number): number => Math.max(300, Math.min(h, window.innerHeight * 0.8))

// 🖱️ Resize 入口（带完整快照 + 防错）
function startResize(direction: string) {
  if (!chatWindowRef.value) return

  // 快照当前状态
  startW = size.width
  startH = size.height
  startPosX = position.x
  startPosY = position.y
  resizeDir = direction
  isResizing = true

  // 精确捕获初始鼠标位置
  const captureStart = (e: MouseEvent) => {
    startClientX = e.clientX
    startClientY = e.clientY
  }
  captureStart(window.event as unknown as MouseEvent)

  const move = (e: MouseEvent) => {
    if (!isResizing || !resizeDir) return

    const deltaX = e.clientX - startClientX
    const deltaY = e.clientY - startClientY

    switch (resizeDir) {
      // ─── 已验证正确的基础方向 ───────────────────────
      case 'left': {
        const newW = clampWidth(startW - deltaX)
        size.width = newW
        position.x = startPosX + (startW - newW)
        break
      }
      case 'right': {
        size.width = clampWidth(startW + deltaX)
        break // x 不变
      }
      case 'top': {
        const newH = clampHeight(startH - deltaY)
        size.height = newH
        position.y = startPosY + (startH - newH)
        break
      }
      case 'bottom': {
        size.height = clampHeight(startH + deltaY)
        break // y 不变
      }
      case 'top-left': {
        const newW = clampWidth(startW - deltaX)
        const newH = clampHeight(startH - deltaY)
        size.width = newW
        size.height = newH
        position.x = startPosX + (startW - newW)
        position.y = startPosY + (startH - newH)
        break
      }
      case 'top-right': {
        const newW = clampWidth(startW + deltaX)
        const newH = clampHeight(startH - deltaY)
        size.width = newW
        size.height = newH
        position.y = startPosY + (startH - newH)
        break
      }
      case 'bottom-left': {
        const newW = clampWidth(startW - deltaX)
        const newH = clampHeight(startH + deltaY)
        size.width = newW
        size.height = newH
        position.x = startPosX + (startW - newW)
        break
      }

      // ─── 🔒 新增：bottom-right（右下角）──────────────────
      case 'bottom-right': {
        // 宽度：向右扩展 → +deltaX（x 不动）
        const newW = clampWidth(startW + deltaX)
        // 高度：向下扩展 → +deltaY（y 不动）

        size.width = newW
        size.height = clampHeight(startH + deltaY)
        // ⚠️ 无须修改 position.x 或 position.y
        break
      }
    }
  }

  const up = () => {
    isResizing = false
    resizeDir = ''
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }

  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}
</script>

<style scoped>
.resize-handle {
  position: absolute;
  background: transparent;
  z-index: 30;
  pointer-events: auto;
}

/* 上下 */
.resize-handle.top {
  top: -5px;
  left: 8px;
  right: 8px;
  height: 10px;
  cursor: ns-resize;
}
.resize-handle.bottom {
  bottom: -5px;
  left: 8px;
  right: 8px;
  height: 10px;
  cursor: ns-resize;
}

/* 左右 */
.resize-handle.left {
  left: -5px;
  top: 8px;
  bottom: 8px;
  width: 10px;
  cursor: ew-resize;
}
.resize-handle.right {
  right: -5px;
  top: 8px;
  bottom: 8px;
  width: 10px;
  cursor: ew-resize;
}

/* 四角 */
.resize-handle.top-left {
  top: -6px;
  left: -6px;
  width: 12px;
  height: 12px;
  cursor: nwse-resize;
}
.resize-handle.top-right {
  top: -6px;
  right: -6px;
  width: 12px;
  height: 12px;
  cursor: nesw-resize;
}
.resize-handle.bottom-left {
  bottom: -6px;
  left: -6px;
  width: 12px;
  height: 12px;
  cursor: nesw-resize;
}
.resize-handle.bottom-right {
  bottom: -6px;
  right: -6px;
  width: 12px;
  height: 12px;
  cursor: nwse-resize;
}
</style>
