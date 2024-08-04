import { Ref, ref } from 'vue'
import { IVueSelectOption, TVueSelectRemoteFunction } from '@/types'

export function useRemote() {
  const search: Ref<String | null> = ref(null)
  const loading: Ref<Boolean> = ref(false)
  const remoteOptions: Ref<IVueSelectOption[]> = ref([])

  const fetchOptions = async (remoteFunction: TVueSelectRemoteFunction, search: String | null) => {
    loading.value = true
    const items = await remoteFunction(search)
    loading.value = false

    return items
  }

  return {
    search,
    loading,
    remoteOptions,
    fetchOptions,
  }
}
