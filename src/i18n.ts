import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

// Get saved language setting from localStorage, default to Chinese
const getStoredLanguage = (): string => {
  const stored = localStorage.getItem('echarts-theme-builder-locale')
  if (stored && ['en', 'zh'].includes(stored)) {
    return stored
  }
  // Auto-select based on browser language
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) {
    return 'zh'
  }
  return 'en'
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
  if (['en', 'zh'].includes(locale)) {
    i18n.global.locale.value = locale as 'en' | 'zh'
    localStorage.setItem('echarts-theme-builder-locale', locale)
  }
}

// Get current language
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

// Get available languages list
export const getAvailableLocales = () => {
  return [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' }
  ]
}

export default i18n
