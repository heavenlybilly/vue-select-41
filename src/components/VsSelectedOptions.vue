<script setup lang="ts">
import { VueSelectValue } from '@/types'
import { PropType, computed } from 'vue'

const props = defineProps({
  value: {
    type: [Object, Array] as PropType<VueSelectValue>,
    required: false,
  },
})

const emits = defineEmits(['delete-item'])

const displayedOptions = computed(() => {
  if (!Array.isArray(props.value)) {
    return null
  }

  return props.value
})

const handleDeleteItem = (value: String) => {
  emits('delete-item', value)
}
</script>

<template>
  <div v-if="displayedOptions && displayedOptions.length">
    <div class="vs-dropdown-selected-options-title">Выбранные значения:</div>

    <!-- todo: add slot -->
    <div
      v-for="(option, index) of displayedOptions"
      :key="index"
      class="vs-dropdown-option vs-dropdown-option--selected"
      @click.stop="handleDeleteItem(option.value)"
    >
      {{ option.label }}
    </div>

    <div class="vs-dropdown-selected-options-divider"/>
  </div>
</template>

<style lang="scss"></style>
