import { VueSelectTranslation } from '@/types'

const translation: VueSelectTranslation = {
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

export default translation