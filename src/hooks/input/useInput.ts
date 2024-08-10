import {
  VueSelectOption,
  VueSelectMultipleValue,
  VueSelectSingleValue,
  VueSelectValue,
} from '@/types'
import { useMultipleInput } from '@/hooks/input/useMultipleInput'
import { useSingleInput } from '@/hooks/input/useSingleInput'

export function useInput(multiple: Boolean) {
  const { handleInput: handleInputMultiple } = useMultipleInput()
  const { handleInput: handleInputSingle } = useSingleInput()

  const selectOption = (value: VueSelectValue | undefined, selectedOption: VueSelectOption) => {
    if (multiple) {
      return handleInputMultiple(value as VueSelectMultipleValue, selectedOption)
    } else {
      return handleInputSingle(value as VueSelectSingleValue, selectedOption)
    }
  }

  const deleteItem = (value: VueSelectMultipleValue, deletedValue: String) => {
    if (multiple) {
      return value.filter((item) => item.value !== deletedValue)
    }
  }

  return {
    selectOption,
    deleteItem,
  }
}
