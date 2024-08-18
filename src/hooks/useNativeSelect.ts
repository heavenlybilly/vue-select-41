import { Ref, watch } from 'vue'
import { VueSelectValue } from '@/types'

export function useNativeSelect(
  element: Ref<HTMLSelectElement | null>,
  value: Ref<VueSelectValue | undefined>,
) {
  const syncValues = () => {
    if (!element.value) {
      console.error('Vue Select 41 (useNativeSelect) error: element is undefined or null')
      return
    }

    element.value.innerHTML = ''

    if (!value.value) {
      return
    }

    const values = Array.isArray(value.value) ? value.value : [value.value]

    values.forEach((val) => {
      const option = document.createElement('option')
      option.value = val.value
      option.text = val.label
      option.selected = true

      if (element.value) {
        element.value.appendChild(option)
      }
    })
  }

  watch(
    () => value.value,
    (newValue) => {
      if (element.value) {
        syncValues()
      }
    },
  )
}
