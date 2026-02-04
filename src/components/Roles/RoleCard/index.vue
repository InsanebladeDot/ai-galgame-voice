<!-- src/components/RoleCard/index.vue -->
<template>
  <div
    class="relative min-w-[160px] w-[160px] h-[260px] md:min-w-[240px] md:w-[240px] md:h-[360px] snap-center overflow-hidden flex flex-col transition-all duration-300 shadow-md hover:border-pink-200"
    :class="['rounded-2xl border-[3px]', isSelected ? 'selected-border' : 'border-white']"
    @click="$emit('select', role.id)"
  >
    <!-- 角色立绘 -->
    <div
      class="flex-1 w-full relative flex items-end justify-center bg-gradient-to-b from-white/20 to-white/60 overflow-hidden"
    >
      <img
        :src="role.avatar"
        :alt="role.name"
        class="h-[90%] w-auto object-contain drop-shadow-md"
      />
    </div>

    <!-- 名字区域 -->
    <div class="p-2 md:p-3 text-center border-t border-white shrink-0 bg-pink-50">
      <h3 class="font-black text-xs md:text-base text-sherry-darkPink line-clamp-1">
        {{ role.displayName }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Character } from '@/types/Story/index'

defineProps<{
  role: Character
  isSelected: boolean
}>()

defineEmits<{
  (e: 'select', id: string): void
}>()
</script>

<style lang="css">
.selected-border {
  border: 3px solid #f472b6 !important; /* 或使用你的主题色变量 */
}
</style>
