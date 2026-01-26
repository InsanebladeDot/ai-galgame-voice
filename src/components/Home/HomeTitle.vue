<!-- src/components/home/HomeTitle.vue -->
<template>
  <div class="absolute top-[5%] md:top-[8%] left-[5%] md:left-[6%] z-20 animate-fade-in-up pointer-events-auto">
    <div class="flex flex-col items-start relative select-none scale-[0.4] md:scale-100 origin-top-left transition-transform duration-500">
      <div class="text-pink-400 font-serif font-bold tracking-[0.5em] text-sm mb-4 ml-2 animate-pulse flex items-center gap-2">
        <span class="h-[1px] w-10 bg-pink-300"></span>オトメ・ドメイン<span class="h-[1px] w-10 bg-pink-300"></span>
      </div>
      <div class="relative transform -rotate-3 hover:scale-105 transition-transform duration-500">
        <h1 class="font-sans font-black text-6xl md:text-[6rem] lg:text-[8rem] xl:text-[9rem] leading-[0.8] tracking-tighter italic relative z-10 text-white" 
            style="-webkit-text-stroke: 8px white; paint-order: stroke;">
          <span class="block text-transparent bg-clip-text bg-gradient-to-b from-[#ff7eb3] to-[#e11d48] filter drop-shadow-[4px_4px_0px_rgba(255,182,193,1)]">Paper</span>
          <span class="block ml-16 md:ml-24 text-transparent bg-clip-text bg-gradient-to-b from-[#60a5fa] to-[#2563eb] filter drop-shadow-[4px_4px_0px_rgba(147,197,253,1)]">Galgame</span>
        </h1>
        <div class="absolute top-[28%] left-[38%] z-20 transform -rotate-12 hover:rotate-12 transition-transform duration-300">
          <span class="font-sans font-black text-7xl md:text-[7rem] lg:text-[8rem] text-yellow-300 drop-shadow-[4px_4px_0_#b45309]" 
                style="-webkit-text-stroke: 4px white; paint-order: stroke;">2</span>
        </div>
      </div>
    </div>
  </div>
</template>