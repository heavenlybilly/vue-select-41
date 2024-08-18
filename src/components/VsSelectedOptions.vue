<script setup lang="ts">
import { PropType } from 'vue'
import { VueSelectI18n, VueSelectValueItem } from '@/types'

const props = defineProps({
  selectedOptions: {
    type: Array as PropType<VueSelectValueItem[]>,
    required: true,
  },
  i18n: {
    type: Object as PropType<VueSelectI18n>,
    required: true,
  },
})

const emits = defineEmits(['delete-item'])

const handleDeleteItem = (value: String) => {
  emits('delete-item', value)
}
</script>

<template>
  <div v-if="selectedOptions.length">
    <div class="vs-dropdown-selected-options-title">{{ props.i18n.selectedRecordsTitle }}:</div>

    <!-- todo: add slot -->
    <div
      v-for="(option, index) of props.selectedOptions"
      :key="index"
      class="vs-dropdown-option vs-dropdown-option--selected"
      @click.stop="handleDeleteItem(option.value)"
    >
      {{ option.label }}
    </div>

    <div class="vs-dropdown-selected-options-divider" />
  </div>
</template>

<style lang="scss"></style>
