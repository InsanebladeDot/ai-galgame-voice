<template>
  <div class="live2d-wrapper w-full h-full flex items-center justify-center p-4">
    <!-- OML2D 挂载容器 -->
    <div ref="oml2dRef" class="oml2d-container w-full h-full max-w-[900px] max-h-[900px]" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { loadOml2d } from 'oh-my-live2d'
import model from './module/index'

const oml2dRef = ref<HTMLElement | null>(null)
let oml2dInstance: ReturnType<typeof loadOml2d> | null = null

const defaultMessage = '你好呀～今天过得怎么样？'

onMounted(() => {
  if (!oml2dRef.value) return

  // 初始化 OML2D
  oml2dInstance = loadOml2d({
    parentElement: oml2dRef.value,
    models: model,
    dialog: { enable: false }, // 禁用默认对话框
    devTools: false,
  })

  oml2dInstance.onLoad((status) => {
    console.log('[OML2D] Load status:', status)
  })

  oml2dInstance.onStageSlideIn(() => {
    showTips(defaultMessage)
  })

  // 绑定点击事件（确保元素存在）
  const attachClick = () => {
    const stage = oml2dRef.value?.querySelector('#oml2d-stage')
    if (stage) {
      stage.addEventListener('click', () => {
        showTips(defaultMessage)
      })
    } else {
      setTimeout(attachClick, 100)
    }
  }
  attachClick()
})

const showTips = (msg: string) => {
  oml2dInstance?.tipsMessage(msg, 4000, 10)
}
</script>

<style scoped>
/* 默认：桌面横屏，居中 */
.live2d-wrapper {
  padding-right: 0;
  transition: padding-right 0.3s ease;
}

/* 🔧 重置 OML2D 默认布局 */
.live2d-wrapper :deep(#oml2d-stage) {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
  pointer-events: auto !important;
}

.live2d-wrapper :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  object-fit: contain !important;
  background: transparent !important;
}

/* 🖥️ 普通横屏 / 桌面：小屏时左推 */
@media (max-width: 1024px) and (orientation: landscape) {
  .live2d-wrapper {
    padding-right: 40px;
  }
}
@media (max-width: 768px) and (orientation: landscape) {
  .live2d-wrapper {
    padding-right: 80px;
  }
}

/* 📱 关键：当 .app-container 被 rotate(90deg) 时（即物理竖屏） */
/* 此时逻辑上是“横屏”，但设备 orientation 是 portrait */
@media screen and (orientation: portrait) {
  .live2d-wrapper {
    /* 在旋转容器内，我们希望模型靠左 */
    padding-right: 100px;
    padding-left: 20px; /* 防止贴太左 */
  }

  /* 如果屏幕特别窄（如 iPhone 竖屏），加大右推力度 */
  @media (max-height: 600px) {
    /* 注意：旋转后 height = 原 width */
    .live2d-wrapper {
      padding-right: 140px;
    }
  }

  @media (max-height: 500px) {
    .live2d-wrapper {
      padding-right: 180px;
    }
  }
}
</style>
