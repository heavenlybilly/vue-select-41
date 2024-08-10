import { Ref, ref } from 'vue'
import { VueSelectOption, VueSelectRemoteFunction } from '@/types'

export function useRemote() {
  const search: Ref<string | null> = ref(null)
  const loading: Ref<Boolean> = ref(false)
  const remoteOptions: Ref<VueSelectOption[]> = ref([])

  const fetchOptions = async (remoteFunction: VueSelectRemoteFunction, search: string | null) => {
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
