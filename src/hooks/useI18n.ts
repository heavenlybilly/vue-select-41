import { Ref, computed } from 'vue'
import { VueSelectLocale } from '@/types'
import en from '@/i18n/en'
import ru from '@/i18n/ru'

const i18ns = {
  ru,
  en,
}

export default function useI18n(locale: Ref<VueSelectLocale>) {
  const i18n = computed(() => {
    return i18ns[locale.value] ?? en
  })

  return {
    i18n,
  }
}
