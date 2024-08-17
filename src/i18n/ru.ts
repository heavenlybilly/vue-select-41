import { VueSelectTranslation } from '@/types'
import pronounce from '@/helpers/pronounce'

const translation: VueSelectTranslation = {
  noResults: 'Ничего не найдено',
  selectedRecordsTitle: 'Выбранные записи',
  recordsSelected: (count: number) => {
    const selected = pronounce(count, 'Выбрана', 'Выбрано', 'Выбрано')
    const records = pronounce(count, 'запись', 'записи', 'записей')

    return `${selected} ${count} ${records}`
  },
  placeholder: {
    single: 'Выберите значение',
    multiple: 'Выберите значения',
    search: 'Введите текст для поиска',
  },
}

export default translation
