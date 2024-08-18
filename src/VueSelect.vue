<script lang="ts">
import { Ref, defineComponent, provide, ref, toRefs, useSlots, watch } from 'vue'
import props from '@/props'
import { VueSelectOption } from '@/types'
import VsField from '@/components/VsField.vue'
import VsLabel from '@/components/VsLabel.vue'
import VsOption from '@/components/VsOption.vue'
import VsSearchInput from '@/components/VsSearchInput.vue'
import VsSelectedOptions from '@/components/VsSelectedOptions.vue'
import { useInput } from '@/hooks/input/useInput'
import useClassObjects from '@/hooks/useClassObjects'
import { useFocus } from '@/hooks/useFocus'
import useI18n from '@/hooks/useI18n'
import { useNativeSelect } from '@/hooks/useNativeSelect'
import useOptions from '@/hooks/useOptions'
import { useWarnings } from '@/hooks/useWarnings'

export default defineComponent({
  name: 'VueSelect',
  components: {
    VsField,
    VsLabel,
    VsOption,
    VsSearchInput,
    VsSelectedOptions,
  },
  props,
  emits: ['input', 'dropdown:opened', 'dropdown:closed'],
  setup(props, { emit }) {
    const nativeRef: Ref<HTMLSelectElement | null> = ref(null)
    const controlRef: Ref<HTMLElement | null> = ref(null)
    const dropdownRef: Ref<HTMLElement | null> = ref(null)

    const slots = useSlots()
    const { locale, multiple, disabled, remote, searchable, options, value, remoteFunction } =
      toRefs(props)

    // init warnings
    useWarnings(props)

    // init native select
    useNativeSelect(nativeRef, value)

    // init focus
    const { focus, setFocus } = useFocus(dropdownRef, controlRef)

    // init locale
    const { i18n } = useI18n(locale)
    provide('i18n', i18n)

    // init input
    const { selectOption, deleteItem } = useInput(multiple)

    // init options
    const { search, searchedOptions, displayedOptions, selectedOptions, setSearch } = useOptions({
      remote,
      searchable,
      focus,
      options,
      value,
      remoteFunction,
    })

    // init class objects
    const { fieldWrapperClasses, dropdownClasses } = useClassObjects({
      focus,
      disabled,
      searchable,
      value,
      selectedOptions,
    })

    const handleFocusChange = () => {
      if (!props.disabled) {
        setFocus(!focus.value)
      }
    }

    const handleSearchInput = (value: string | null) => {
      setSearch(value)
    }

    const handleSelect = (option: VueSelectOption) => {
      const newValue = selectOption(props.value, option)
      emit('input', newValue)

      if (props.closeOnSelect) {
        setFocus(false)
      }
    }

    const handleDeleteItem = (value: String) => {
      if (Array.isArray(props.value)) {
        const newValue = deleteItem(props.value, value)
        emit('input', newValue ?? null)
      }

      if (props.closeOnSelect) {
        setFocus(false)
      }
    }

    watch(
      () => focus.value,
      async (newValue) => {
        if (newValue) {
          setSearch(null)
        }

        if (newValue) {
          emit('dropdown:opened')
        } else {
          emit('dropdown:closed')
        }
      },
    )

    watch(
      () => props.multiple,
      (newValue) => {
        if (newValue) {
          emit(
            'input',
            [props.value].filter((item) => !!item),
          )
        } else {
          emit('input', props.value[0] ?? null)
        }
      },
    )

    return {
      slots,
      nativeRef,
      controlRef,
      dropdownRef,
      focus,
      search,
      searchedOptions,
      displayedOptions,
      selectedOptions,
      fieldWrapperClasses,
      dropdownClasses,
      i18n,
      handleFocusChange,
      handleSearchInput,
      handleSelect,
      handleDeleteItem,
    }
  },
})
</script>

<template>
  <div class="vs-wrapper">
    <select
      ref="nativeRef"
      :name="name"
      :multiple="multiple"
      :required="required"
      class="vs-native-element"
    />

    <div ref="controlRef">
      <vs-label v-if="label" :required="required" @click="handleFocusChange">
        {{ label }}:
      </vs-label>
      <vs-field
        :value="value"
        :placeholder="placeholder"
        :selected-display-limit="selectedDisplayLimit"
        :focus="focus"
        :class="fieldWrapperClasses"
        @click="handleFocusChange"
        @delete-item="handleDeleteItem"
      />
    </div>

    <div ref="dropdownRef" class="vs-dropdown" :class="dropdownClasses">
      <vs-search-input v-if="searchable" :value="search" @input="handleSearchInput" />

      <div
        v-if="displayedOptions.length || selectedOptions.length"
        class="vs-dropdown-options-list"
      >
        <vs-selected-options
          v-if="multiple && showSelected"
          :selected-options="selectedOptions"
          @delete-item="handleDeleteItem"
        />

        <template v-if="slots.option">
          <div
            v-for="(option, index) of displayedOptions"
            :key="`option-${index}`"
            @click="handleSelect(option)"
          >
            <slot name="option" :item="option" :selected="option.selected"></slot>
          </div>
        </template>
        <template v-else>
          <vs-option
            v-for="(option, index) of displayedOptions"
            :key="`option-${index}`"
            :selected="option.selected"
            @click="handleSelect(option)"
          >
            {{ option.label }}
          </vs-option>
        </template>
      </div>

      <template v-if="!displayedOptions.length">
        <slot v-if="slots.noOptions" name="noOptions"></slot>
        <div v-else class="vs-dropdown-plug">{{ i18n.noResults }}</div>
      </template>
    </div>
  </div>
</template>
