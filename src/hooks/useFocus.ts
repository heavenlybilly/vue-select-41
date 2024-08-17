import { Ref, onMounted, onUnmounted, ref } from 'vue'

export function useFocus(
  dropdownElement: Ref<HTMLElement | null>,
  controlElement: Ref<HTMLElement | null>,
) {
  const focus = ref(false)

  const setFocus = (value: boolean) => {
    focus.value = value
  }

  const handleClickOutside = (event: Event) => {
    const isClickedControl =
      !!controlElement.value && controlElement.value.contains(event.target as Node)
    const isClickedDropdown =
      !!dropdownElement.value && dropdownElement.value.contains(event.target as Node)

    if (isClickedControl || isClickedDropdown || !focus.value) {
      return
    }

    focus.value = false
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
