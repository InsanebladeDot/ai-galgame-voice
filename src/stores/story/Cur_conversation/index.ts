// stores/role.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Dialogue } from '@/types/Story/index'

//当前对话信息
export const useCurConversationStore = defineStore('CurConversation', () => {
  // 使用 ref，支持 undefined / 数组 切换
  const CurConversation = ref<Dialogue | undefined>(undefined)

  // 重置为空
  function initCurConversation() {
    CurConversation.value = undefined
  }

  // 导入当前对话文本
  function insertCurConversation(dialogueList: Dialogue) {
    CurConversation.value = dialogueList
  }

  return {
    CurConversation,           
    initCurConversation,
    insertCurConversation
  }
}, {
  persist: true
})