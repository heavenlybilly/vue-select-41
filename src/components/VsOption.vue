<script setup lang="ts">
import { computed } from 'vue'

const emits = defineEmits(['click'])

const props = defineProps({
  selected: {
    type: Boolean,
    required: true,
  },
})

const classes = computed(() => ({
  'vs-dropdown-option--selected': props.selected,
}))

const handleClick = () => {
  emits('click')
}
</script>

<template>
  <div :class="classes" class="vs-dropdown-option" @click="handleClick">
    <slot></slot>
  </div>
</template>
