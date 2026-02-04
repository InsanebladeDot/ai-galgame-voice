<template>
  <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
    <RoleCard
      v-for="role in rolesStore.roles"
      :key="role.id"
      :role="role"
      :is-selected="selectedId === role.id"
      @select="onSelect(role)"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import RoleCard from './RoleCard/index.vue'
import { useRolesStore } from '@/stores/Roles/index'
import { useRoleStore } from '@/stores/Roles/Role/index'
import type { Character } from '@/types/Story/index'
import { SetModule } from '@/Api/Voice/TTS/Start/Module/index'
import { voiceModels } from '@/Data/module/voiceModels'
const rolesStore = useRolesStore()

const roleStore = useRoleStore()

const selectedId = ref<string>('')

function onSelect(role: Character) {
  selectedId.value = role.id
  roleStore.ChangeRole(role)
  console.log(roleStore.role?.name)
  // 选择对象的时候把模型调整成对应角色的音色模型
  if (roleStore.role?.name) Set_Module(roleStore.role?.name)
}
const Set_Module = (role_name: string) => {
  if (voiceModels.elysia && voiceModels.firely) {
    console.log('设置模型')
    if (role_name === '流萤') {
      SetModule(voiceModels.firely)
    } else SetModule(voiceModels.elysia)
  }
}

onMounted(() => {
  // 初始化默认角色（通常在 onMounted 或应用启动时调用一次）
  rolesStore.initRoles()
})
</script>
