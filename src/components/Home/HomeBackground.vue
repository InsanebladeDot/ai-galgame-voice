<!-- src/components/home/HomeBackground.vue -->
<template>
  <div class="absolute inset-0 w-full h-full bg-[#fff0f5] overflow-hidden font-sans select-none">
    <!-- 斜条纹背景 -->
    <div 
      class="absolute inset-0 opacity-10"
      style="background-image: linear-gradient(45deg, rgb(244, 114, 182) 25%, transparent 25%, transparent 50%, rgb(244, 114, 182) 50%, rgb(244, 114, 182) 75%, transparent 75%, transparent); background-size: 60px 60px;"
    ></div>

    <!-- 旋转圆环 -->
   <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full border-[20px] border-white/40 animate-spin-reverse pointer-events-none"></div>
  </div>
</template>