<template>
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
    
    <!-- 模型选择容器 -->
    <div class="relative">
      <!-- 搜索输入框 (用于筛选) -->
      <div class="relative">
        <input
          v-model="searchQuery"
          placeholder="搜索模型 (Qwen, Claude, HunYuan...)"
          class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all pr-10"
          @click="toggleDropdown"
        />
        <button 
          @click="toggleDropdown"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          :aria-expanded="isDropdownOpen"
          aria-label="切换模型选择菜单"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            :class="{ 'rotate-180': isDropdownOpen }"
          >
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- 模型下拉菜单 -->
      <div 
        v-if="isDropdownOpen" 
        class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-96 overflow-y-auto py-1"
        @mouseleave="handleMouseLeave"
      >
        <!-- 分组渲染 -->
        <template v-for="(group, groupName) in filteredModules" :key="groupName">
          <div 
            v-if="group.length > 0"
            class="px-3 py-2 border-b border-slate-100 last:border-b-0"
          >
            <div class="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-2">
              <span v-if="groupName.includes('高')">
                <svg class="w-3 h-3 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
              </span>
              <span v-else-if="groupName.includes('中')">
                <svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </span>
              <span v-else>
                <svg class="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.25 7.75a.75.75 0 01.75-.75h2a.75.75 0 010 1.5H9a.75.75 0 00-.75.75v2a.75.75 0 001.5 0v-1.25h1.25a.75.75 0 010 1.5H9a.75.75 0 00-.75.75v2a.75.75 0 001.5 0v-1.25h1.25a.75.75 0 010 1.5H8.25a.75.75 0 01-.75-.75v-5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
              </span>
              {{ getDisplayName(groupName) }}
            </div>
            
            <div class="space-y-1">
              <button
                v-for="model in group"
                :key="model.id"
                @click="selectModel(model)"
                class="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all hover:bg-purple-50 hover:text-purple-700 focus:bg-purple-100 focus:outline-none"
                :class="{
                  'bg-purple-50 border-l-4 border-purple-500 text-purple-700 font-medium': 
                    systemSettingStore.customAiModel.modelName === model.id
                }"
              >
                <div class="font-medium">{{ model.name }}</div>
                <div class="text-xs text-slate-500 mt-0.5 flex flex-wrap gap-2">
                  <span>{{ model.description.split('｜')[0] }}</span>
                  <span class="text-purple-600 font-medium">{{ model.priceNote.split('｜')[0] }}</span>
                </div>
              </button>
            </div>
          </div>
        </template>

        <!-- 无结果提示 -->
        <div 
          v-if="Object.values(filteredModules).flat().length === 0"
          class="px-4 py-6 text-center text-slate-500 text-sm"
        >
          未找到匹配的模型 "{{ searchQuery }}"
        </div>

        <!-- 自定义选项 -->
        <div class="border-t border-slate-100 mt-1 pt-2 px-3">
          <button
            @click="selectCustomModel"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
            :class="{
              'bg-slate-100 font-medium': !isPredefinedModel
            }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>自定义模型 ID</span>
          </button>
        </div>
      </div>

      <!-- 价格提示 (仅当选择预定义模型时显示) -->
      <div 
        v-if="isPredefinedModel && selectedModelPrice"
        class="mt-1.5 text-[10px] text-slate-500 flex items-center gap-1.5"
      >
        <div class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.373 3.143a.75.75 0 01.752 1.298l-4.5 5.25a.75.75 0 01-1.055 0l-4.5-5.25a.75.75 0 011.055-1.098L7.5 8.444V3a.75.75 0 011.5 0v5.132l3.373-3.989z" clip-rule="evenodd" />
          </svg>
          <span>{{ selectedModelPrice }}</span>
        </div>
        <span class="text-slate-300">•</span>
        <span class="text-purple-600 font-medium">{{ selectedModelUseCase }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSystemSettingStore } from '@/stores/Setting/SystemSetting'
import { Chat_modules } from "@/Data/module/AiChatModels"

const systemSettingStore = useSystemSettingStore()

// 状态管理
const isDropdownOpen = ref(false)
const searchQuery = ref(systemSettingStore.customAiModel.modelName || '')
const lastBlurTime = ref(0)

// 计算属性
const filteredModules = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const result = {}
  
  // 按分组过滤
  for (const [groupName, models] of Object.entries(Chat_modules)) {
    const filtered = models.filter(model => 
      model.name.toLowerCase().includes(query) || 
      model.description.toLowerCase().includes(query) ||
      model.id.toLowerCase().includes(query)
    )
    
    if (filtered.length > 0) {
      result[groupName] = filtered
    }
  }
  
  return result
})

const isPredefinedModel = computed(() => {
  // 检查当前模型是否在预定义列表中
  return Object.values(Chat_modules).flat().some(
    model => model.id === systemSettingStore.customAiModel.modelName
  )
})

const selectedModelPrice = computed(() => {
  const model = Object.values(Chat_modules).flat().find(
    m => m.id === systemSettingStore.customAiModel.modelName
  )
  return model?.priceNote?.split('｜')[0] || ''
})

const selectedModelUseCase = computed(() => {
  const model = Object.values(Chat_modules).flat().find(
    m => m.id === systemSettingStore.customAiModel.modelName
  )
  return model?.recommendedFor || model?.description?.split('｜')[1] || '通用任务'
})

// 方法
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectModel = (model) => {
  systemSettingStore.customAiModel.modelName = model.id
  searchQuery.value = model.name
  isDropdownOpen.value = false
}

const selectCustomModel = () => {
  // 保留当前输入内容，清空搜索
  searchQuery.value = systemSettingStore.customAiModel.modelName
  isDropdownOpen.value = false
}

const getDisplayName = (groupName) => {
  const map = {
    '高token（高成本）': '🔥 高性能 (高成本)',
    '中（平衡）': '⚡ 平衡型',
    '低（经济）': '💰 经济型'
  }
  return map[groupName] || groupName
}

const handleMouseLeave = () => {
  // 延迟关闭，防止鼠标移动到滚动条时关闭
  setTimeout(() => {
    if (Date.now() - lastBlurTime.value > 200) {
      isDropdownOpen.value = false
    }
  }, 300)
}

// 全局点击监听
const handleClickOutside = (e) => {
  const dropdown = document.querySelector('.relative > div:last-child')
  if (dropdown && !dropdown.contains(e.target) && !e.target.closest('input')) {
    isDropdownOpen.value = false
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 优化滚动条样式 */
.max-h-96::-webkit-scrollbar {
  width: 8px;
}
.max-h-96::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.max-h-96::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 4px;
}
.max-h-96::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>