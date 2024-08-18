import { type Ref, computed, watchEffect } from 'vue'
import { VueSelectOption, VueSelectRemoteFunction, VueSelectValue } from '@/types'
import debounce from '@/helpers/debounce'
import { useRemote } from '@/hooks/useRemote'

export default function useOptions(params: {
  remote: Ref<boolean>
  searchable: Ref<boolean>
  options: Ref<VueSelectOption[]>
  value: Ref<VueSelectValue | undefined>
  remoteFunction: Ref<VueSelectRemoteFunction | undefined>
}) {
  const { search, remoteOptions, fetchOptions } = useRemote()

  const searchedOptions = computed(() => {
    if (params.remote.value) {
      return remoteOptions.value
    }

    if (!params.searchable.value || !search.value) {
      return params.options.value
    }

    return params.options.value.filter((item) => {
      return item.label.toLowerCase().includes(search.value?.toLowerCase() ?? '')
    })
  })

  const displayedOptions = computed(() => {
    const selectedValues = Array.isArray(params.value.value)
      ? params.value.value.map((item) => item.value)
      : [params.value.value?.value].filter(Boolean)

    return searchedOptions.value.map((option) => ({
      ...option,
      selected: selectedValues.includes(option.value),
    }))
  })

  const selectedOptions = computed(() => {
    if (!Array.isArray(params.value.value)) {
      return params.value.value ? [params.value.value] : []
    }

    return params.value.value
  })

  const reloadOptions = async () => {
    if (params.remote.value && params.remoteFunction.value) {
      remoteOptions.value = await fetchOptions(params.remoteFunction.value, search.value)
    }
  }

  watchEffect(
    debounce(async () => {
      if (params.remote.value && params.remoteFunction.value) {
        remoteOptions.value = await fetchOptions(params.remoteFunction.value, search.value)
      }
    }, 200),
  )

  return {
    search,
    searchedOptions,
    displayedOptions,
    selectedOptions,
    reloadOptions,
  }
}
