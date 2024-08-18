import { Ref } from 'vue'
import {
  VueSelectMultipleValue,
  VueSelectOption,
  VueSelectSingleValue,
  VueSelectValue,
} from '@/types'
import { useMultipleInput } from '@/hooks/input/useMultipleInput'
import { useSingleInput } from '@/hooks/input/useSingleInput'

export function useInput(multiple: Ref<boolean>) {
  const { handleInput: handleInputMultiple } = useMultipleInput()
  const { handleInput: handleInputSingle } = useSingleInput()

  const selectOption = (value: VueSelectValue | undefined, selectedOption: VueSelectOption) => {
    if (multiple.value) {
      return handleInputMultiple(value as VueSelectMultipleValue, selectedOption)
    } else {
      return handleInputSingle(value as VueSelectSingleValue, selectedOption)
    }
  }

  const deleteItem = (value: VueSelectMultipleValue, deletedValue: String) => {
    if (multiple.value) {
      return value.filter((item) => item.value !== deletedValue)
    }
  }

  return {
    selectOption,
    deleteItem,
  }
}
