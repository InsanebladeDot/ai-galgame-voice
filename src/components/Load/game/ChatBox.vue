<template>
 <div  class="
                relative w-full max-w-6xl 
                min-h-[140px] md:min-h-[220px] 
                transition-all duration-300 transform
                bg-white/90 backdrop-blur-xl
                shadow-[0_10px_50px_rgba(0,0,0,0.2)]
                border border-white/50
                rounded-2xl rounded-tl-none
                overflow-visible
                group
                cursor-pointer
                pointer-events-auto
                
            ">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sherry-blue to-purple-300 rounded-t-xl opacity-80"></div>
          <div class="
                    absolute -top-8 md:-top-10 left-0
                    h-8 md:h-11 px-6 md:px-10
                    flex items-center justify-center
                    rounded-t-xl rounded-tr-[20px]
                    shadow-md
                    text-base md:text-xl font-bold tracking-widest
                    border-t border-x border-white/50
                    backdrop-blur-md
                    z-10
                    bg-gradient-to-r from-sherry-blue to-blue-500 text-white
                ">{{CurConversation.CurConversation?.character?.displayName}}
          </div>
          <div class="absolute -top-10 md:-top-12 right-0 flex  pointer-events-auto">
       
            <el-button :icon="DArrowLeft" round class="!py-5 ">回退</el-button>
            <el-button :icon="VideoPlay" round class="!py-5 ">自动</el-button>
            <el-button :icon="Files" round class="!py-5 ">记录</el-button>
            <el-button :icon="Hide" round class="!py-5 ">隐藏</el-button>

          </div>
          <!-- 聊天框 -->
          <div @click="next_dialogue()" class="p-4 md:px-12 md:py-8 flex flex-col h-full relative">
            <!-- 文本区域 -->
            <div class="
                    text-base md:text-2xl leading-relaxed tracking-wide font-medium
                    text-slate-800
                ">
                <Typewriter 
                :full-text="fullText"
                v-model:trigger="triggerNext"
                @next="handleNextStep"
                />

            </div>



            <div class="absolute bottom-2 right-4 md:bottom-6 md:right-8 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right md:w-9 md:h-9 text-sherry-blue filter drop-shadow-md" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>


          </div>

          <div class="absolute bottom-0 right-0 opacity-10 pointer-events-none hidden md:block">
            <svg width="200" height="100" viewBox="0 0 200 100">
              <path d="M100,100 L200,100 L200,0 C150,50 150,50 100,100 Z" fill="#60a5fa"></path>
            </svg>
          </div>
          
        </div>
</template>
<script lang="ts" setup>
import { VideoPlay, Files, Hide, DArrowLeft } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
//导入默认剧本
import {getDialogueByIndex} from '@/Data/Story/util/index'
import Typewriter from '@/components/util/Typewriter.vue'
import {useCurConversationStore} from '@/stores/story/Cur_conversation/index'
import type { Dialogue } from '@/types/Story'
const CurConversation = useCurConversationStore()
const index = ref(0);

const fullText = ref(getDialogueByIndex(index.value)?.text || '[无文本]')
const next_dialogue = () => {
  triggerNext.value = true

}
// 默认对话开始
//是否点击
const triggerNext = ref(false)
const handleNextStep = ()=>{
  // 简单逻辑
  index.value++
  const Cur_conversation:Dialogue | undefined = getDialogueByIndex(index.value)
  fullText.value = Cur_conversation?.text || '[剧本结束]'
  console.log(CurConversation.CurConversation)
  updataCurConversation()
  //跟新当前文本后 查看数据
}
const updataCurConversation = ()=>{
 const dialogue = getDialogueByIndex(index.value)
    if (dialogue) {
      CurConversation.insertCurConversation(dialogue)
    } else {
      console.warn('对话不存在，跳过插入')
    }
}
onMounted(()=>{
   updataCurConversation()
})
</script>