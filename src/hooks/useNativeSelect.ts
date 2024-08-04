import { TValue } from '@/types'

export function useNativeSelect() {
  const syncValues = (element: HTMLSelectElement, value: TValue | TValue[] | null | undefined) => {
    element.innerHTML = ''

    if (!value) {
      return
    }

    const values = Array.isArray(value) ? value : [value]

    values.forEach((val) => {
      const option = document.createElement('option')
      option.value = val.value
      option.text = val.label
      option.selected = true
      element.appendChild(option)
    })
  }

  return {
    syncValues,
  }
}
