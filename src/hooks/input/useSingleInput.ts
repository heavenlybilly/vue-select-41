import { VueSelectOption, VueSelectSingleValue } from '@/types'

export function useSingleInput() {
  const handleInput = (value: VueSelectSingleValue, selectedOption: VueSelectOption) => {
    // todo: check clearable
    if (value && value.value === selectedOption.value) {
      return null
    }

    return {
      value: selectedOption.value,
      label: selectedOption.label,
    }
  }

  return {
    handleInput,
  }
}
