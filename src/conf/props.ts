import { PropType } from 'vue'
import { ISelectOption, TRemoteFunction, TValue } from '../types'

export interface IProps {
  label?: string
  multiple: boolean
  remote: boolean
  remoteFunction?: TRemoteFunction
  value?: TValue | TValue[] | null
  options: ISelectOption[]
  placeholder?: string
}

export const VsProps = {
  label: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  closeOnSelect: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  // todo
  disabled: {
    type: Boolean,
    default: false,
  },
  // todo
  clearable: {
    type: Boolean,
    default: false,
  },
  // todo
  hasPagination: {
    type: Boolean,
    default: false,
  },
  // todo + warnings
  perPage: {
    type: Number,
    default: 20,
  },
  // todo: преобразование options нужный компоненту формат
  valueField: {
    type: String,
    default: 'value',
  },
  labelField: {
    type: String,
    default: 'value',
  },
  value: {
    type: [Object, Array] as PropType<TValue | TValue[] | null>,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  options: {
    type: Array as PropType<ISelectOption[]>,
    default: () => [],
  },
  remoteFunction: {
    type: Function as PropType<TRemoteFunction>,
    required: false,
  },
  selectedDisplayLimit: {
    type: Number,
    default: 3,
  },
}
