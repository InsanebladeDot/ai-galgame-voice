// ========== 1. 定义语气关键词库（保持不变）==========
const emotionKeywords = {
  angry: [
    '混蛋', '可恶', '住口', '闭嘴', '烦死了', '滚', '气死我了', '你到底', '有没有在听',
    '废物', '蠢货', '白痴', '神经病', '有病吧', '找死', '别逼我', '忍无可忍', '火大',
    '怒吼', '咆哮', '咬牙切齿', '暴跳如雷', '七窍生烟', '怒不可遏', '气炸了', '离谱',
    '够了！', '行了！', '停下！', '你听不懂人话吗？', '烦不烦啊！', '能不能消停点？',
    '谁允许你了？', '你算什么东西？', '给我滚出去！', '！', '！！', '！！！'
  ],
  sad: [
    '呜呜', '哭', '好害怕', '对不起', '再也', '回不去了', '... ', '眼泪', '心碎', '好难过', '求你',
    '绝望', '孤独', '无助', '崩溃', '窒息', '心痛', '泪流满面', '泣不成声', '哽咽',
    '为什么是我', '没人懂我', '世界好冷', '好累', '撑不住了', '想消失', '……', '...',
    '如果当初……', '要是你还在就好了', '我真的很想…', '对不起，都是我的错', '我不配'
  ],
  arrogant: [
    '只有我', '弱者', '不堪一击', '呵', '凡人', '你配吗', '也就只有我能', '高高在上', '愚蠢',
    '蝼蚁', '井底之蛙', '不自量力', '可笑', '可怜', '施舍', '恩赐', '跪下', '仰望',
    '区区', '不过如此', '弹指间', '挥手即灭', '何足挂齿', '你也配？', '在我面前你什么都不是'
  ],
  cheerful: [
    '太好了', '成功了', '开心', '耶', '终于', '真棒', '嘻嘻', '哈哈', '万岁', '哇！', '哦耶！',
    '冲鸭！', '给力！', '绝了！', 'yyds！', '我们做到了！', '一起加油！', '未来可期！',
    '明天会更好！', '快看！', '发现宝藏了！', '惊喜！', '阳光', '彩虹', '闪闪发光'
  ],
  whisper: [
    '嘘', '小声', '别出声', '悄悄', '附近', '有人', '秘密', '……', '轻点',
    '他在听', '墙有耳朵', '别让他们发现', '快躲起来', '听我说', '这是个秘密',
    '屏住呼吸', '蹑手蹑脚', '藏起来', '危险', '陷阱', '小心'
  ]
} as const

type Emotion = keyof typeof emotionKeywords | 'calm'

// ========== 2. 核心：检测语气 ==========
function detectTextEmotion(text: string): Emotion {
  if (!text.trim()) return 'calm'

  const lowerText = text.toLowerCase()
  let bestEmotion: Emotion = 'calm'
  let maxScore = 0

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    let score = 0
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        score += ['混蛋', '滚', '哭', '呜呜', '呵', '太好了', '嘘'].includes(keyword) ? 2 : 1
      }
    }

    if (score > maxScore) {
      maxScore = score
      bestEmotion = emotion as Emotion
    }
  }

  // 修复正则：去掉空格，正确匹配结尾感叹号
  if (maxScore === 0 && /！ $ |! $ /.test(text.trim())) {
    bestEmotion = text.length < 20 ? 'cheerful' : 'angry'
  }

  return bestEmotion
}

// ========== 3. ✨ 你要的函数：返回自定义字符串 ==========
/**
 * 根据文本和角色名，返回一个语音 key 字符串
 * 例如：getVoiceKeyByText('你好！', 'liuying') → 'liuying_cheerful'
 */
export function getVoiceKeyByText(text: string, character?: string): string {
  const emotion = detectTextEmotion(text)
  const base_url = 'F:/AI/GPT-SoVITS/GPT-SoVITS-Test-resource/module/语气集合/通用/'
  return base_url + emotion + '.wav'
}