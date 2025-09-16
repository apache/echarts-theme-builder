import { useI18n } from 'vue-i18n'
import { setLocale, getCurrentLocale, getAvailableLocales } from '../i18n'

/**
 * Localization composable
 * Provides common i18n functionality
 */
export function useLocalization() {
  const { t, locale } = useI18n()

  /**
   * Switch language
   * @param newLocale New language code
   */
  const switchLanguage = (newLocale: string) => {
    setLocale(newLocale)
  }

  /**
   * Get current language
   */
  const currentLanguage = getCurrentLocale()

  /**
   * Get available languages list
   */
  const availableLanguages = getAvailableLocales()

  /**
   * Get available languages list function
   */
  const getAvailableLanguages = () => getAvailableLocales()

  /**
   * Check if current language matches specified language
   * @param lang Language code
   */
  const isLanguage = (lang: string) => {
    return getCurrentLocale() === lang
  }

  /**
   * Get formatted date text
   * @param date Date object
   */
  const formatDate = (date: Date) => {
    const isZh = isLanguage('zh')
    return date.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  /**
   * Get formatted number text
   * @param num Number
   */
  const formatNumber = (num: number) => {
    const isZh = isLanguage('zh')
    return num.toLocaleString(isZh ? 'zh-CN' : 'en-US')
  }

  return {
    t,
    locale,
    switchLanguage,
    currentLanguage,
    availableLanguages,
    getAvailableLanguages,
    isLanguage,
    formatDate,
    formatNumber
  }
}
