import { ISelectOption, TValue } from '../../types'

export function useMultipleInput() {
  const handleInput = (value: TValue[], selectedOption: ISelectOption) => {
    const alreadySelected = !!value.find((item) => item.value === selectedOption.value)

    if (alreadySelected) {
      return value.filter((item) => item.value !== selectedOption.value)
    }

    return [
      ...value,
      {
        value: selectedOption.value,
        label: selectedOption.label,
      },
    ]
  }

  return {
    handleInput,
  }
}
