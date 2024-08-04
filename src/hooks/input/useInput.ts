import {
  IVueSelectOption,
  TVueSelectMultipleValue,
  TVueSelectSingleValue,
  TVueSelectValue,
} from '@/types'
import { useMultipleInput } from '@/hooks/input/useMultipleInput'
import { useSingleInput } from '@/hooks/input/useSingleInput'

export function useInput(multiple: Boolean) {
  const { handleInput: handleInputMultiple } = useMultipleInput()
  const { handleInput: handleInputSingle } = useSingleInput()

  const selectOption = (value: TVueSelectValue | undefined, selectedOption: IVueSelectOption) => {
    if (multiple) {
      return handleInputMultiple(value as TVueSelectMultipleValue, selectedOption)
    } else {
      return handleInputSingle(value as TVueSelectSingleValue, selectedOption)
    }
  }

  const deleteItem = (value: TVueSelectMultipleValue, deletedValue: String) => {
    if (multiple) {
      return value.filter((item) => item.value !== deletedValue)
    }
  }

  return {
    selectOption,
    deleteItem,
  }
}
