<script setup lang="ts">
import { VueSelectValue } from '@/types'
import { PropType, computed } from 'vue'
import i18n from '@/helpers/i18n'

const props = defineProps({
  value: {
    type: [Array, Object] as PropType<VueSelectValue>,
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
      <div v-if="hasValue" class="vs-displayed-value-wrapper">
        <div v-if="singleValue" class="vs-displayed-value">{{ singleValue.label }}</div>
        <div class="vs-displayed-value" v-else-if="multipleValue.length > props.selectedDisplayLimit">
          {{ selectedRecordsTitle }}
        </div>
        <template v-else>
          <div
            v-for="(item, index) of multipleValue"
            :key="index"
            class="vs-displayed-value-item"
          >
            <span>{{ item.label }}</span>
            <span class="vs--cross" @click.stop="handleDeleteItem(item.value)"></span>
          </div>
        </template>
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
