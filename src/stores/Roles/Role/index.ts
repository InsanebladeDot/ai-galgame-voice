// stores/role.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Partner } from '@/types/Roles'
import { rolesDefault } from '@/Data/Roles/default'

export const useRoleStore = defineStore('Role', () => {
  // 响应式单个角色（初始为 undefined）
  const role = ref<Partner>()

  // 初始化：设置为第一个角色
  function initRole() {
    if (rolesDefault.length > 0 && !role.value?.id) {
      role.value = rolesDefault[0] // ✅ 直接取数组第一个元素
    }
  }
function ChangeRole(RoleMessage:Partner) {
   role.value = RoleMessage
  }
  return { role, initRole ,ChangeRole} // 函数名保持一致
},{
  persist: true
})