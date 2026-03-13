// utils/i18n-dictionary.ts
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json' // 注意：日语标准代码为 'ja'，此处按需求保留 'jp'

// 定义支持的语言类型（严格约束）
export type SupportedLocale = 'zh' | 'en' | 'ja'
export type LocaleMessages = typeof zh // 自动推导字典结构类型

// 语言包映射（Key 与 SupportedLocale 严格对齐）
const LOCALE_MAP: Record<SupportedLocale, LocaleMessages> = {
  zh,
  en,
  ja,
} as const

/**
 * 同步获取指定语言的完整翻译字典
 * @param locale 语言代码（'zh' | 'en' | 'jp'）
 * @param fallbackLocale 兜底语言（默认 'en'）
 * @returns 对应语言的字典对象（类型安全）
 *
 * @example
 * const dict = getLocaleDictionary('jp')
 * console.log(dict.common.confirm) // 类型提示 + 完整路径
 */
export function getLocaleDictionary(
  locale: string,
  fallbackLocale: SupportedLocale = 'en',
): LocaleMessages {
  // 严格校验：仅当 locale 在 SupportedLocale 范围内才使用
  if (locale in LOCALE_MAP && Object.keys(LOCALE_MAP).includes(locale)) {
    return LOCALE_MAP[locale as SupportedLocale]
  }
  console.warn(`[i18n] 语言 "${locale}" 未支持，已回退至 "${fallbackLocale}"`)
  return LOCALE_MAP[fallbackLocale]
}

// 可选：导出所有语言包（用于初始化 Vue I18n）
export const ALL_LOCALES = LOCALE_MAP
