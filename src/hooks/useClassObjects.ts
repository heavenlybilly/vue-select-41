import { computed, type Ref, ref } from 'vue'
import { VueSelectProps } from '@/types'

export default function useClassObjects(props: VueSelectProps) {

  const fieldWrapperClasses = computed(() => ({
    'vs-field-wrapper--disabled': props.disabled,
  }))

  return {
    fieldWrapperClasses,
  }
}
