<script setup lang="ts">
const props = defineProps({
  required: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['click'])

const handleClick = () => {
  emits('click')
}
</script>

<template>
  <div>
    <span
      ref="labelElement"
      :class="{ 'vs-label--required': props.required }"
      class="vs-label"
      @click.stop="handleClick"
    >
      <slot></slot>
    </span>
  </div>
</template>

<style scoped lang="scss"></style>
