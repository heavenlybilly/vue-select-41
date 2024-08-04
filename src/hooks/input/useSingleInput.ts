import { ISelectOption, TValue } from '@/types'

export function useSingleInput() {
  const handleInput = (value: TValue | null, selectedOption: ISelectOption) => {
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
