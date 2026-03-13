// stores/role.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Dialogue, Story } from '@/types/Story/index'
import { startDustLibraryStory } from '@/Data/Story/default'

export const useBaseStoryManager= defineStore('BaseStoryManager', () => {
  // 使用 ref，支持 undefined / 数组 切换
  const BaseStoryManager = ref<Story[]>([]) // 初始化为空数组，或直接初始化为默认剧本 [starDustLibraryStory]

  // 重置为空
  function initBaseStoryManager() {
    BaseStoryManager.value = []
  }
  //初始化默认剧本
  function initDefaultStoryManager() {
    BaseStoryManager.value = [startDustLibraryStory]
  }
  // 导入剧本
  function insertBaseStoryManager(storyList: Story) {
    BaseStoryManager.value = [storyList]
  }

  return {
    BaseStoryManager,           
    initBaseStoryManager,
    insertBaseStoryManager,
    initDefaultStoryManager
  }
}, {
  persist: true
})