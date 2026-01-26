// stores/role.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Dialogue } from '@/types/Story/index'

export const useBaseDialogueStore = defineStore('BaseDialogue', () => {
  // 使用 ref，支持 undefined / 数组 切换
  const BaseDialogueList = ref<Dialogue[] | undefined>(undefined)

  // 重置为空
  function initBaseDialogueList() {
    BaseDialogueList.value = undefined
  }

  // 导入剧本
  function insertBaseDialogueList(dialogueList: Dialogue[]) {
    BaseDialogueList.value = dialogueList
  }

  return {
    BaseDialogueList,           
    initBaseDialogueList,
    insertBaseDialogueList
  }
}, {
  persist: true
})