import { marked } from 'marked'
import DOMPurify from 'dompurify'


/**
 * 清理文本：移除颜文字、Emoji、无意义符号组合，保留句子必需内容
 * @param text 原始文本
 * @param options 可选配置
 * @returns 清理后的文本
 */
export function cleanText(
  text: string,
  options: {
    keepEmojis?: boolean; // 是否保留Emoji（默认false）
    customEmoticons?: RegExp[]; // 用户自定义颜文字正则
  } = {}
): string {
  let result = text;

  // =============== STEP 1: 移除颜文字（核心） ===============
  // 常见ASCII颜文字（覆盖 :) :( :D ;) ^_^ T_T 等）
  const asciiEmoticons = /(?::|;|=|8|X|x|B|D)[-oO^*']?(?:\)|\(|D|P|p|S|s|O|o|\/|\\|3|\]|})|\^\^|\^\_\^|T_T|;_;|<3|o\.O|O\.o|@\w+@/g;
  
  // 常见全角/混合颜文字（覆盖 （；一_一） (´・ω・`) 等）
  const cjkEmoticons = /（；[一_]+；）|（´・[ω\u3093]・`）|（>_<）|（；д；）|（╯°□°）╯|（ﾉ◕ヮ◕）ﾉ|【[・□・]】/g;
  
  // 应用内置 + 用户自定义规则
  result = result.replace(asciiEmoticons, '');
  result = result.replace(cjkEmoticons, '');
  if (options.customEmoticons) {
    options.customEmoticons.forEach(regex => {
      result = result.replace(regex, '');
    });
  }

  // =============== STEP 2: 保留有效字符（白名单策略） ===============
  // 保留：所有语言文字(\p{L})、数字(\p{N})、空白符(\s)
  //       + 句子必需标点（中英文核心标点，严格筛选）
  //       + （可选）Emoji
  const essentialPunctuation = '.,?!:;\'"()[]{}《》、，。？！：；“”‘’（）【】…—·「」『』';
  const keepPattern = options.keepEmojis
    ? new RegExp(`[^\\p{L}\\p{N}\\s${essentialPunctuation}\\p{Emoji_Presentation}]`, 'gu')
    : new RegExp(`[^\\p{L}\\p{N}\\s${essentialPunctuation}]`, 'gu');
  
  result = result.replace(keepPattern, '');

  // =============== STEP 3: 空格规范化 ===============
  result = result
    .replace(/\s+/g, ' ') // 多空格/换行→单空格
    .replace(/\s([.,?!:;，。？！：；])/g, '$1') // 移除标点前空格（中文习惯）
    .trim();

  return result;
}


export const renderMarkdown = async (text: string): Promise<string> => {
  const html = await marked(text, { breaks: true, gfm: true });
  return DOMPurify.sanitize(html);
}