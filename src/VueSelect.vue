<script setup lang="ts">
import { Ref, computed, ref, useSlots, watch } from 'vue'
import VsField from './components/VsField.vue'
import VsLabel from './components/VsLabel.vue'
import VsOption from './components/VsOption.vue'
import VsSearchInput from './components/VsSearchInput.vue'
import VsSelectedOptions from './components/VsSelectedOptions.vue'
import { VsProps } from './conf/props'
import debounce from './helpers/debounce'
import i18n from './helpers/i18n'
import { useInput } from './hooks/input/useInput'
import { useFocus } from './hooks/useFocus'
import { useNativeSelect } from './hooks/useNativeSelect'
import { useRemote } from './hooks/useRemote'
import { useWarnings } from './hooks/useWarnings'
import { ISelectOption } from './types'

const props = defineProps(VsProps)
const emits = defineEmits(['input', 'dropdown:opened', 'dropdown:closed'])

const nativeElement: Ref<HTMLSelectElement | null> = ref(null)
const dropdownElement: Ref<HTMLElement | null> = ref(null)

useWarnings(props)

const slots = useSlots()
const { focus, setFocus } = useFocus([props.closeOnSelect ? ref(null) : dropdownElement])
const { search, remoteOptions, fetchOptions } = useRemote()
const { selectOption, deleteItem } = useInput(props.multiple)
const { syncValues } = useNativeSelect()

const searchedOptions = computed(() => {
  if (props.remote) {
    return remoteOptions.value
  }

  return props.options.filter((item) => {
    return item.label.toLowerCase().includes(search.value?.toLowerCase() ?? '')
  })
})

const displayedOptions = computed(() => {
  const selectedValues = Array.isArray(props.value)
    ? props.value.map((item) => item.value)
    : [props.value?.value].filter(Boolean)

  return searchedOptions.value.map((option) => ({
    ...option,
    selected: selectedValues.includes(option.value),
  }))
})

const focusChangeHandle = () => {
  setFocus(!focus.value)
}

const selectHandle = (option: ISelectOption) => {
  const newValue = selectOption(props.value, option)
  emits('input', newValue)
}

const handleDeleteItem = (value: String) => {
  if (Array.isArray(props.value)) {
    const newValue = deleteItem(props.value, value)
    emits('input', newValue)
  }
}

watch(
  () => focus.value,
  async (newValue) => {
    if (!newValue) {
      search.value = null
      remoteOptions.value = []
    }

    if (newValue && props.remote && props.remoteFunction) {
      remoteOptions.value = await fetchOptions(props.remoteFunction, search.value)
    }

    if (newValue) {
      emits('dropdown:opened')
    } else {
      emits('dropdown:closed')
    }
  },
)

watch(
  () => search.value,
  debounce(async (value) => {
    if (props.remote && props.remoteFunction) {
      remoteOptions.value = await fetchOptions(props.remoteFunction, value)
    }
  }, 200),
)

watch(
  () => props.value,
  (newValue) => {
    if (nativeElement.value) {
      syncValues(nativeElement.value, newValue)
    }
  },
)
</script>

<template>
  <div class="vs-wrapper">
    <select
      ref="nativeElement"
      :name="props.name"
      :multiple="props.multiple"
      :required="props.required"
      class="vs-native-element"
    />

    <div>
      <vs-label v-if="props.label" :required="props.required" @click="focusChangeHandle">
        {{ props.label }}:
      </vs-label>
      <vs-field
        :value="props.value"
        :placeholder="props.placeholder"
        :selected-display-limit="props.selectedDisplayLimit"
        :focus="focus"
        @click="focusChangeHandle"
        @delete-item="handleDeleteItem"
      />
    </div>

    <div v-if="focus" ref="dropdownElement" class="vs-dropdown">
      <vs-search-input v-model="search" />

      <div class="vs-dropdown-options-list">
        <vs-selected-options :value="props.value" @delete-item="handleDeleteItem" />

        <template v-if="slots.option">
          <div
            v-for="(option, index) of displayedOptions"
            :key="`option-${index}`"
            @click="selectHandle(option)"
          >
            <slot name="option" :item="option" :selected="option.selected"></slot>
          </div>
        </template>
        <template v-else>
          <vs-option
            v-for="(option, index) of displayedOptions"
            :key="`option-${index}`"
            :selected="option.selected"
            @click="selectHandle(option)"
          >
            {{ option.label }}
          </vs-option>
        </template>
      </div>

      <template v-if="!displayedOptions.length">
        <slot v-if="slots.noOptions" name="noOptions"></slot>
        <div v-else class="vs-no-options">{{ i18n.noResults }}</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss"></style>
