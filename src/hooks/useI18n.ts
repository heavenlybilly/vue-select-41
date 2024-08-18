import { Ref, computed } from 'vue'
import { VueSelectLocale } from '@/types'
import de from '@/i18n/de'
import en from '@/i18n/en'
import fr from '@/i18n/fr'
import ru from '@/i18n/ru'

const i18ns = {
  ru,
  en,
  de,
  fr,
}

export default function useI18n(locale: Ref<VueSelectLocale>) {
  const i18n = computed(() => {
    return i18ns[locale.value] ?? en
  })

  return {
    i18n,
  }
}
