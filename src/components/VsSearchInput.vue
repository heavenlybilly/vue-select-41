<script setup lang="ts">
import { PropType, Ref, computed, onMounted, ref } from 'vue'
import { VueSelectI18n } from '@/types'

const props = defineProps({
  value: {
    type: String as PropType<String | null>,
    required: false,
  },
  i18n: {
    type: Object as PropType<VueSelectI18n>,
    required: true,
  },
})

const emits = defineEmits(['input'])

const searchInputElement: Ref<HTMLElement | null> = ref(null)

const searchPlaceholder = computed(() => {
  return props.i18n.placeholder.search
})

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits('input', target.value)
}

onMounted(() => {
  if (searchInputElement.value) {
    searchInputElement.value.focus()
  }
})
</script>

<template>
  <div class="vs-search">
    <input
      :value="props.value"
      ref="searchInputElement"
      class="vs-search-input"
      type="text"
      :placeholder="searchPlaceholder"
      @input="handleInput"
      @click.stop
    />
  </div>
</template>

<style module lang="scss"></style>
