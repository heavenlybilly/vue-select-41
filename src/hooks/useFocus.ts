import { Ref, onMounted, onUnmounted, ref } from 'vue'

export function useFocus(nonBlurElements: Ref<HTMLElement | null>[]) {
  const focus = ref(false)

  const setFocus = (value: boolean) => {
    focus.value = value
  }

  const handleClickOutside = (event: Event) => {
    const isClickOutside = nonBlurElements.every((ref) => {
      const element = ref.value
      return !element || !element.contains(event.target as Node)
    })

    if (isClickOutside) {
      focus.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    focus,
    setFocus,
  }
}
