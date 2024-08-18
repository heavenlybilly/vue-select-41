import { PropType } from 'vue'
import { VueSelectLocale, VueSelectOption, VueSelectRemoteFunction, VueSelectValue } from '@/types'

export default {
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
  locale: {
    type: String as PropType<VueSelectLocale>,
    default: 'en',
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
  showSelected: {
    type: Boolean,
    default: true,
  },
  value: {
    type: [Object, Array] as PropType<VueSelectValue>,
    required: false,
  },
}