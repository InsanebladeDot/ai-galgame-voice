// 在你的 script setup 中
import { starDustLibraryStory } from '@/Data/Story/default'
import type { Dialogue } from '@/types/Story/index'

// 根据索引获取对话
export const getDialogueByIndex = (index: number): Dialogue | undefined => {
  return starDustLibraryStory[index]
}
