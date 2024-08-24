<script setup lang="ts">
import { PropType, Ref, computed, inject } from 'vue'
import { VueSelectI18n } from '@/types'

const props = defineProps({
  search: {
    type: String as PropType<string | null>,
    required: false,
  },
})

const i18n = inject('i18n') as Ref<VueSelectI18n>

const label = computed(() => {
  return props.search ? i18n.value.noResults(props.search) : i18n.value.noOptions
})
</script>

<template>
  <div class="vs-dropdown-plug">{{ label }}</div>
</template>
