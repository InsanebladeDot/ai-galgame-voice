<template>
  <div class="app-container font-sans bg-blue-50 relative selection:bg-sherry-blue selection:text-white">
    <div class="absolute inset-0 z-0 w-full h-full overflow-hidden">
      <div class="absolute inset-0 z-50 bg-[#fff0f5] flex flex-col items-center justify-center overflow-hidden font-sans select-none">
        <div class="absolute inset-0 opacity-30 bg-stripes-pink pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40 pointer-events-none"></div>

        <div class="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-start z-30 pointer-events-none">
            <!-- 这个位置 -->
          <loadButton/>

         <PTS/>
        </div>

        <div class="z-20 relative flex flex-col items-center justify-center animate-fade-in-up delay-200 w-full max-w-lg px-6">
          <div class="group relative w-full overflow-hidden rounded-[32px] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(236,72,153,0.15)]">
            <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none w-[200%] z-0"></div>
            <div class="relative z-10 p-8 md:p-10 flex flex-col items-center text-center gap-6">
              <a
                href="https://watcha.cn/"
                target="_blank"
                rel="noopener noreferrer"
                class="relative p-2 transition-transform duration-300 group-hover:-translate-y-1 cursor-pointer rounded-xl hover:bg-white/40 block"
                title="Visit GuanCha Insights"
              >
                <img
                  alt="GuanCha Insights"
                  class="h-16 md:h-20 w-auto object-contain filter drop-shadow-md"
                  src="https://i.postimg.cc/GmpXBdBH/wei-xin-tu-pian-20251228171845.png"
                />
                <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-slate-400 whitespace-nowrap">
                  <span>watcha.cn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-external-link"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </div>
              </a>

              <div class="space-y-4 pointer-events-none w-full">
                <div class="flex flex-col items-center gap-3">
                  <div class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 backdrop-blur-sm">
                    <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">本项目由GPT-SOVITS 支撑</span>
                  </div>
                  <h3 class="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 tracking-tight font-serif italic">
                    玩AI，上观猹。
                  </h3>
                </div>

                <div class="pt-4 border-t border-slate-200/50 w-full flex items-center justify-center gap-2 text-slate-400 font-medium text-xs md:text-sm animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-loader-circle w-3 h-3 md:w-4 md:h-4 animate-spin"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                  <span>语音正在生成中...</span>
                </div>
              </div>

            </div>
          </div>
        </div>

       

        
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import loadButton from '@/components/Load/loadButton/loadButton.vue';
import PTS from '@/components/Load/loadButton/PTS.vue';
</script>