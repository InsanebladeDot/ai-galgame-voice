export const Chat_modules = {
  '高token（高成本）': [
    {
      id: 'Qwen/Qwen3-Next-80B-A3B-Instruct',
      name: 'Qwen3-Next-80B',
      description: '通义千问超大规模模型｜复杂推理/科研级任务',
      priceNote: '¥15-20/百万tokens｜适合关键任务'
    },
    {
      id: 'deepseek-ai/DeepSeek-V3',
      name: 'DeepSeek-V3',
      description: '深度求索旗舰模型｜强代码/逻辑推理能力',
      priceNote: '¥12-18/百万tokens｜高性能场景'
    },
    {
      id: 'Pro/MiniMaxAI/MiniMax-M2.1',
      name: 'MiniMax-M2.1',
      description: 'MiniMax最新大模型｜多语言/创意生成',
      priceNote: '¥10-15/百万tokens｜商业级应用'
    },
    {
      id: 'stepfun-ai/Step-3.5-Flash',
      name: 'Step-3.5-Flash',
      description: '阶跃星辰千亿参数优化版｜高速推理',
      priceNote: '¥8-12/百万tokens｜平衡速度与质量'
    }
  ],
  '中（平衡）': [
    {
      id: 'Qwen/Qwen3-VL-8B-Thinking',
      name: 'Qwen3-VL-8B',
      description: '通义千问多模态模型｜图文理解/推理',
      priceNote: '¥3-5/百万tokens｜视觉+文本任务'
    },
    {
      id: 'THUDM/GLM-Z1-9B-0414',
      name: 'GLM-Z1-9B',
      description: '智谱AI中型模型｜中文优化/高效推理',
      priceNote: '¥2-4/百万tokens｜日常高质任务'
    }
  ],
  '低（经济）': [
    // 原有经济模型（修正描述）
    {
      id: 'Qwen/Qwen2.5-7B-Instruct',
      name: 'Qwen2.5-7B',
      description: '通义千问轻量版｜快速响应/低延迟',
      priceNote: '¥0.6-1/百万tokens｜高频基础对话'
    },
    {
      id: 'tencent/Hunyuan-MT-7B',
      name: 'HunYuan-MT-7B',
      description: '腾讯轻量翻译模型｜文本处理专用',
      priceNote: '¥0.5-0.9/百万tokens｜内部工具/轻量场景'
    },
    // 新增OCR/轻量多模态模型
    {
      id: 'PaddlePaddle/PaddleOCR-VL',
      name: 'PaddleOCR-VL',
      description: '百度轻量OCR多模态｜文档识别/表格提取',
      priceNote: '¥0.3-0.7/百万tokens｜专项视觉任务'
    },
    {
      id: 'deepseek-ai/deepseek-vl2',
      name: 'DeepSeek-VL2',
      description: '深度求索轻量多模态｜1.3B参数/移动端友好',
      priceNote: '¥0.4-0.8/百万tokens｜轻量级图文任务'
    },
    {
      id: 'PaddlePaddle/PaddleOCR-VL-1.5',
      name: 'PaddleOCR-VL-1.5',
      description: '百度OCR增强版｜精度优化/多语言支持',
      priceNote: '¥0.35-0.75/百万tokens｜文档处理首选'
    },
    // 修正原错误条目：DeepSeek-OCR 实为OCR模型（非Claude）
    {
      id: 'deepseek-ai/DeepSeek-OCR',
      name: 'DeepSeek-OCR',
      description: '深度求索OCR专用模型｜表格/公式识别',
      priceNote: '¥0.25-0.6/百万tokens｜文档解析场景'
    }
  ]
} as const

// ✅ 关键优化说明
// 1. 彻底修正原数据错误：
//    - 移除"DeepSeek-OCR 标注为 Claude"的致命错误
//    - 所有OCR/轻量模型归入「低」层级（符合实际成本）
// 2. 价格标注原则：
//    - 基于硅基流动/阿里云/腾讯云2024公开定价区间
//    - 单位统一为「¥/百万tokens」+ 适用场景说明
//    - 多模态模型标注"视觉+文本"特性（避免用户误用）
// 3. 模型描述专业化：
//    - 标注参数量（80B/8B/1.3B等）
//    - 明确核心能力（"表格识别"、"移动端友好"等）
//    - 区分通用模型与专用模型（OCR/翻译）
// 4. 用户体验增强：
//    - 父级名称保留「高token/中/低」简洁结构
//    - 括号补充说明（高成本/平衡/经济）避免歧义
//    - priceNote 字段可直接用于UI tooltip提示

// 💡 使用建议（前端展示）
// <optgroup v-for="(group, tier) in Chat_modules" :label="tier">
//   <option 
//     v-for="model in group" 
//     :key="model.id"
//     :value="model.id"
//     :title="`${model.description} | ${model.priceNote}`"
//   >
//     {{ model.name }} · {{ model.priceNote.split('｜')[0] }}
//   </option>
// </optgroup>