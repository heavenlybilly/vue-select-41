import { IVueSelectOption, TVueSelectSingleValue } from '@/types'

export function useSingleInput() {
  const handleInput = (value: TVueSelectSingleValue, selectedOption: IVueSelectOption) => {
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
