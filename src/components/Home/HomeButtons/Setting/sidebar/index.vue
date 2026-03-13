<!-- Sidebar 组件 (sidebar/index.vue) -->
<template>
  <div class="w-16 md:w-64 bg-slate-50/50 border-r border-slate-100 flex flex-col p-2 md:p-4 gap-2 shrink-0">
    <!-- 标题区域 -->
    <div class="hidden md:flex items-center gap-2 px-3 py-4 mb-2">
      <div class="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings" aria-hidden="true">
          <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </div>
      <h2 class="text-sm font-black text-slate-700 tracking-wider uppercase">Options</h2>
    </div>

    <!-- 动态菜单项 -->
    <nav class="flex flex-col gap-2">
      <button 
        v-for="item in menuItems" 
        :key="item.id"
        :title="item.title"
        @click="$emit('select-menu', item.id)"
        :class="[
          'flex items-center   justify-center md:justify-start gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl font-bold text-sm transition-all duration-200',
          activeId === item.id 
            ? ' text-pink-500 shadow-md border border-pink-100 hover:shadow-lg hover:-translate-y-0.5' 
            : 'text-slate-400 border border-white hover:bg-white/50 hover:text-slate-700'
        ]"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="shrink-0"
          aria-hidden="true"
        >
          <template v-if="item.icon === 'settings'">
            <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </template>
          <template v-else-if="item.icon === 'sparkles'">
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
            <path d="M20 2v4"></path>
            <path d="M22 4h-4"></path>
            <circle cx="4" cy="20" r="2"></circle>
          </template>
          <template v-else-if="item.icon === 'music'">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </template>
        </svg>
        <span class="hidden md:inline">{{ item.label }}</span>
      </button>
    </nav>

    <!-- 底部操作 -->
    <div class="mt-auto pt-4 border-t border-slate-100">
      <button 
        class="w-full flex items-center justify-center md:justify-start gap-2 px-3 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors duration-200 rounded-lg hover:bg-slate-100/50"
        @click="handleClose"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
        <span class="hidden md:inline">保存并关闭</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  menuItems: Array<{
    id: string
    label: string
    title: string
    icon: string
  }>
  activeId: string
}>()

const emit = defineEmits<{
  'select-menu': [id: string]
}>()

const handleClose = () => {
  console.log('触发保存并关闭操作')
  // 实际项目中可添加：保存设置逻辑 + 关闭面板逻辑
  // emit('close-panel')
}
</script>

<style scoped>
button.bg-white svg {
  color: #ec4899;
}
button {
  will-change: transform, box-shadow;
}
</style>