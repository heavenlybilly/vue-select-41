import { computed } from 'vue'
import { VueSelectLocale } from '@/types'
import en from '@/i18n/en'
import ru from '@/i18n/ru'
import de from '@/i18n/de'
import fr from '@/i18n/fr'

const locales = {
  ru,
  en,
  de,
  fr,
}

export default function useLocale() {
  const getTranslation = (locale: VueSelectLocale) => {
    return locales[locale] ?? en
  }

  return {
    getTranslation,
  }
}
