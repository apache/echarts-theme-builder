import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

// Available languages list
export const availableLocales = Object.freeze([
  { code: 'en', name: 'English' },
  { code: 'zh', name: '简体中文' }
])

// Get saved language setting from localStorage, default to Chinese
const getStoredLanguage = (): string => {
  const stored = import.meta.env.DEV
    ? localStorage.getItem('echarts-theme-builder-locale')
    : ((window as any).EC_WWW_LANG === 'zh' ? 'zh' : 'en')
  if (stored && availableLocales.some(l => l.code === stored)) {
    return stored
  }
  // Auto-select based on browser language
  const browserLang: string = document.documentElement.lang || navigator.language || (navigator as any).browserLanguage
  return browserLang && browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getStoredLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

// Save language setting to localStorage
export const setLocale = (locale: string) => {
  if (availableLocales.some(l => l.code === locale)) {
    i18n.global.locale.value = locale as 'en' | 'zh'
    if (import.meta.env.DEV) {
      localStorage.setItem('echarts-theme-builder-locale', locale)
    }
  }
}

// Get current language
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

export default i18n
