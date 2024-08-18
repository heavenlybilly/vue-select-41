<script setup lang="ts">
import { PropType, Ref, computed, inject, onMounted, ref } from 'vue'
import { VueSelectI18n } from '@/types'

const props = defineProps({
  value: {
    type: String as PropType<String | null>,
    required: false,
  },
})

const emits = defineEmits(['input'])

const i18n = inject('i18n') as Ref<VueSelectI18n>

const inputRef: Ref<HTMLElement | null> = ref(null)

const searchPlaceholder = computed(() => {
  return i18n.value.placeholder.search
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits('input', target.value)
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})
</script>

<template>
  <div class="vs-search">
    <input
      :value="props.value"
      ref="inputRef"
      class="vs-search-input"
      type="text"
      :placeholder="searchPlaceholder"
      @input="handleInput"
      @click.stop
    />
  </div>
</template>

<style module lang="scss"></style>
