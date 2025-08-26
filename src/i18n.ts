import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

// 从 localStorage 获取保存的语言设置，默认为中文
const getStoredLanguage = (): string => {
  const stored = localStorage.getItem('echarts-theme-builder-locale')
  if (stored && ['en', 'zh'].includes(stored)) {
    return stored
  }
  // 根据浏览器语言自动选择
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getStoredLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

// 保存语言设置到 localStorage
export const setLocale = (locale: string) => {
  if (['en', 'zh'].includes(locale)) {
    i18n.global.locale.value = locale as 'en' | 'zh'
    localStorage.setItem('echarts-theme-builder-locale', locale)
  }
}

// 获取当前语言
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

// 获取可用语言列表
export const getAvailableLocales = () => {
  return [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' }
  ]
}

export default i18n
