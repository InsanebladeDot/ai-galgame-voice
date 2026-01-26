// stores/role.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStorySettingStore = defineStore('StorySetting', () => {
  // 自动语音 每一个文本对话都会自动被加载并且播放 （实时加载 有延迟） 默认不开
  const Auto_voice_switch = ref(false)
  // 自动加载对话  默认不开
  const Auto_Dialog_switch = ref(false)
  // 是否开启记录？
  const Record_switch = ref(false)
  //是否隐藏？ 
  const Conceal_switch = ref(false)

  return {
    Auto_voice_switch,
    Auto_Dialog_switch,
    Record_switch,
    Conceal_switch,
  }
}, {
  persist: true
})