<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['input'])

const label = computed(() => {
  return props.value ? 'true' : 'false'
})

const styles = computed(() => ({
  backgroundColor: props.value ? '#5acf2e' : '#f8d11a'
}))

const handleInput = () => {
  emits('input', !props.value)
}
</script>

<template>
  <button class="switcher" :style="styles" @click="handleInput">{{ label }}</button>
</template>

<style scoped lang="scss">
.switcher {
  border: none;
  border-radius: 5px;
  padding: 0.2rem 0.4rem;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 0.8rem;
}
</style>