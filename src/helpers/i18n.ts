import ru from '@/i18n/ru'
import pronounce from '@/helpers/pronounce'

const locale = ru

export default {
  noResults: locale.noResults,
  selectedItemsTitle: locale.selectedItemsTitle,
  selected: (number: number) => {
    const selected = pronounce(
      number,
      locale.selected.one,
      locale.selected.two,
      locale.selected.five,
    )

    const records = pronounce(number, locale.records.one, locale.records.two, locale.records.five)

    return `${selected} ${number} ${records}`
  },
  placeholder: locale.placeholder,
}
