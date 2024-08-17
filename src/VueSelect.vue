<script lang="ts">
import VsField from '@/components/VsField.vue'
import VsLabel from '@/components/VsLabel.vue'
import VsOption from '@/components/VsOption.vue'
import VsSearchInput from '@/components/VsSearchInput.vue'
import VsSelectedOptions from '@/components/VsSelectedOptions.vue'
import { PropType, Ref, computed, defineComponent, ref, useSlots, watch } from 'vue'
import { VueSelectOption, VueSelectRemoteFunction, VueSelectValue } from '@/types'
import { useInput } from '@/hooks/input/useInput'
import { useFocus } from '@/hooks/useFocus'
import { useNativeSelect } from '@/hooks/useNativeSelect'
import { useRemote } from '@/hooks/useRemote'
import { useWarnings } from '@/hooks/useWarnings'
import debounce from '@/helpers/debounce'
import i18n from '@/helpers/i18n'

export default defineComponent({
  name: 'VueSelect',
  components: {
    VsField,
    VsLabel,
    VsOption,
    VsSearchInput,
    VsSelectedOptions,
  },
  props: {
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: false,
    },
    options: {
      type: Array as PropType<VueSelectOption[]>,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    remoteFunction: {
      type: Function as PropType<VueSelectRemoteFunction>,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    selectedDisplayLimit: {
      type: Number,
      default: 3,
    },
    value: {
      type: [Object, Array] as PropType<VueSelectValue>,
      required: false,
    },
  },
  emits: ['input', 'dropdown:opened', 'dropdown:closed'],
  setup(props, { emit }) {
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

      if (!props.searchable) {
        return props.options
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

    const selectedOptions = computed(() => {
      if (!Array.isArray(props.value)) {
        return props.value ? [props.value] : []
      }

      return props.value
    })

    const fieldWrapperClasses = computed(() => ({
      'vs-field-wrapper--disabled': props.disabled
    }))

    const dropdownClasses = computed(() => ({
      'vs-dropdown--visible': focus.value,
      'vs-dropdown--no-search': !props.searchable,
      'vs-dropdown--no-selected': !selectedOptions.value.length,
    }))

    const focusChangeHandle = () => {
      if (!props.disabled) {
        setFocus(!focus.value)
      }
    }

    const selectHandle = (option: VueSelectOption) => {
      const newValue = selectOption(props.value, option)
      emit('input', newValue)
    }

    const handleDeleteItem = (value: String) => {
      if (Array.isArray(props.value)) {
        const newValue = deleteItem(props.value, value)
        emit('input', newValue ?? null)
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
          emit('dropdown:opened')
        } else {
          emit('dropdown:closed')
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

    watch(
      () => props.value,
      (newValue) => {
        if (newValue) {
          focus.value = false
        }
      })

    return {
      nativeElement,
      dropdownElement,
      focus,
      searchedOptions,
      displayedOptions,
      selectedOptions,
      fieldWrapperClasses,
      dropdownClasses,
      focusChangeHandle,
      selectHandle,
      handleDeleteItem,
      slots,
      search,
      i18n,
    }
  },
})
</script>

<template>
  <div class="vs-wrapper">
    <select
      ref="nativeElement"
      :name="name"
      :multiple="multiple"
      :required="required"
      class="vs-native-element"
    />

    <vs-label v-if="label" :required="required" @click="focusChangeHandle"> {{ label }}:</vs-label>
    <vs-field
      :value="value"
      :placeholder="placeholder"
      :selected-display-limit="selectedDisplayLimit"
      :focus="focus"
      :class="fieldWrapperClasses"
      @click="focusChangeHandle"
      @delete-item="handleDeleteItem"
    />

    <div ref="dropdownElement" class="vs-dropdown" :class="dropdownClasses">
      <vs-search-input v-if="searchable" v-model="search" />

      <div v-if="displayedOptions.length || selectedOptions.length" class="vs-dropdown-options-list">
        <vs-selected-options
          v-if="multiple"
          :selected-options="selectedOptions"
          @delete-item="handleDeleteItem"
        />

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
        <div v-else class="vs-dropdown-plug">{{ i18n.noResults }}</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss"></style>
