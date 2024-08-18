import { type Ref, computed, ref } from 'vue'
import { VueSelectOption, VueSelectProps, VueSelectValue } from '@/types'

export default function useClassObjects(params: {
  focus: Ref<boolean>
  disabled: Ref<boolean>
  searchable: Ref<boolean>
  value: Ref<VueSelectValue | undefined>
  selectedOptions: Ref<VueSelectOption[]>
}) {
  const fieldWrapperClasses = computed(() => ({
    'vs-field-wrapper--disabled': params.disabled.value,
  }))

  const dropdownClasses = computed(() => ({
    'vs-dropdown--visible': params.focus.value,
    'vs-dropdown--no-search': !params.searchable.value,
    'vs-dropdown--no-selected': !params.selectedOptions.value.length,
  }))

  return {
    fieldWrapperClasses,
    dropdownClasses,
  }
}
