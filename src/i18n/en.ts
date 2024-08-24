import { VueSelectI18n } from '@/types'

const i18n: VueSelectI18n = {
  noOptions: 'No options available',
  noResults: (search: string) => {
    return `No results found for '${search}'`
  },
  selectedRecordsTitle: 'Selected records',
  recordsSelected: (count: number) => {
    const form = count === 1 ? 'record' : 'records'
    return `${count} ${form} selected`
  },
  placeholder: {
    single: 'Select a value',
    multiple: 'Select values',
    search: 'Enter text to search',
  },
}

export default i18n
