import { VueSelectI18n } from '@/types'
import pronounce from '@/helpers/pronounce'

const i18n: VueSelectI18n = {
  noOptions: 'Здесь ничего нет',
  noResults: (search: string) => {
    return `По запросу '${search}' ничего не найдено`
  },
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

export default i18n
