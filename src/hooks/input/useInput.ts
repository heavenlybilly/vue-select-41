import { ISelectOption, TValue } from '@/types'
import { useMultipleInput } from '@/hooks/input/useMultipleInput'
import { useSingleInput } from '@/hooks/input/useSingleInput'

export function useInput(multiple: Boolean) {
  const { handleInput: handleInputMultiple } = useMultipleInput()
  const { handleInput: handleInputSingle } = useSingleInput()

  const selectOption = (
    value: TValue | TValue[] | null | undefined,
    selectedOption: ISelectOption,
  ) => {
    if (multiple) {
      return handleInputMultiple(value as TValue[], selectedOption)
    } else {
      return handleInputSingle(value as TValue | null, selectedOption)
    }
  }

  const deleteItem = (value: TValue[], deletedValue: String) => {
    if (multiple) {
      return value.filter((item) => item.value !== deletedValue)
    }
  }

  return {
    selectOption,
    deleteItem,
  }
}
