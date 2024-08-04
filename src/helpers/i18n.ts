import pronounce from './pronounce'
import ru from '../i18n/ru'

const locale = ru

export default {
  noResults: locale.noResults,
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
