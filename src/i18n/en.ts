import { VueSelectI18n } from '@/types'

const i18n: VueSelectI18n = {
  noResults: "No results found",
  selectedRecordsTitle: "Selected records",
  recordsSelected: (count: number) => {
    const form = count === 1 ? 'record' : 'records'
    return `${count} ${form} selected`
  },
  placeholder: {
    single: "Select a value",
    multiple: "Select values",
    search: "Enter text to search"
  }
};

export default i18n