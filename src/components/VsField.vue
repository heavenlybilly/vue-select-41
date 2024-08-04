<script setup lang="ts">
import { PropType, computed } from 'vue'
import i18n from '../helpers/i18n'
import { TValue } from '../types'

const props = defineProps({
  value: {
    type: [Array, Object] as PropType<TValue | TValue[] | null>,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  focus: {
    type: Boolean,
    required: true,
  },
  selectedDisplayLimit: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['click', 'delete-item'])

const singleValue = computed(() => {
  if (Array.isArray(props.value)) {
    return null
  }

  return props.value
})

const multipleValue = computed(() => {
  if (!Array.isArray(props.value)) {
    return []
  }

  return props.value
})

const hasValue = computed(() => {
  return !!singleValue.value || multipleValue.value.length
})

const selectedRecordsTitle = computed(() => {
  if (Array.isArray(props.value)) {
    return i18n.selected(props.value.length)
  }
})

const arrowClass = computed(() => ({
  'vs-chevron--up': props.focus,
}))

const displayedPlaceholder = computed(() => {
  if (props.placeholder) {
    return props.placeholder
  }

  if (Array.isArray(props.value)) {
    return i18n.placeholder.multiple
  }

  return i18n.placeholder.single
})

const handleClick = () => {
  emits('click')
}

const handleDeleteItem = (value: String) => {
  emits('delete-item', value)
}
</script>

<template>
  <div class="vs-field-wrapper" @click.stop="handleClick">
    <div class="vs-field">
      <div v-if="hasValue" class="vs-displayed-value">
        <div v-if="singleValue" class="vs-displayed-value-item">{{ singleValue.label }}</div>
        <template v-else-if="multipleValue.length <= props.selectedDisplayLimit">
          <div
            v-for="(item, index) of multipleValue"
            :key="index"
            class="vs-displayed-value-item vs-displayed-value-item--multiple"
          >
            <span>{{ item.label }}</span>
            <span class="vs--cross" @click.stop="handleDeleteItem(item.value)"></span>
          </div>
        </template>
        <div v-else>
          {{ selectedRecordsTitle }}
        </div>
      </div>
      <div v-else class="vs-field-placeholder">
        {{ displayedPlaceholder }}
      </div>
    </div>
    <div class="vs-field-arrow">
      <div :class="arrowClass" class="vs-chevron"></div>
    </div>
  </div>
</template>

<style lang="scss"></style>
