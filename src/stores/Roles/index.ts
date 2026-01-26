// stores/role.ts （或您的实际路径）
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Partner } from '@/types/Roles'
import { rolesDefault } from '@/Data/Roles/default'

export const useRolesStore = defineStore('Roles', () => {
  const roles = ref<Partner[]>([])
  //初始化默认角色列表
  function initRoles() {
    roles.value = [...rolesDefault] // 使用展开运算符避免直接引用（可选但推荐）
  }

  /**
   * 添加一个新角色到列表末尾
   * @param newRole - 符合 Partner 类型的新角色对象
   */
  function addRole(newRole: Partner) {
    // 可选：检查 id 是否已存在，避免重复（根据业务需求决定）
    const exists = roles.value.some(role => role.id === newRole.id)
    if (exists) {
      console.warn(`角色 ID "${newRole.id}" 已存在，未重复添加`)
      return
    }

    roles.value.push(newRole)
  }

  return { roles, initRoles, addRole }
})