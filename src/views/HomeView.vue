<!-- src/views/Home/index.vue -->
<script setup lang="ts">

// 如果需要切换角色，可以在这里管理状态
import { nene } from '@/stores/image/Roles'
import HomeBackground from '@/components/Home/HomeBackground.vue'
import HomeTitle from '@/components/Home/HomeTitle.vue'
import HomeCharacter from '@/components/Home/HomeCharacter.vue'
import HomeButtons from '@/components/Home/HomeButtons.vue'
import { onMounted, ref } from 'vue'
import { useRoleStore } from '@/stores/Roles/Role/index'
const roleStore = useRoleStore()

onMounted(() => {
  roleStore.initRole() // 初始化选中第一个角色
})

</script>

<template>
  <div class="app-container font-sans bg-blue-50 relative selection:bg-sherry-blue selection:text-white">
    <HomeBackground />
    <HomeTitle />
    <HomeCharacter :character-img="roleStore.role?.img || nene" />
    <HomeButtons/>

  
  </div>
</template>

<style scoped>

</style>