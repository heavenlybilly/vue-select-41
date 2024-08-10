export type VueSelectValue = VueSelectValueItem[] | VueSelectValueItem | null
export type VueSelectSingleValue = VueSelectValueItem | null
export type VueSelectMultipleValue = VueSelectValueItem[]

export type VueSelectValueItem = {
  value: string
  label: string
}

export interface VueSelectOption extends VueSelectValueItem {
  [key: string]: any
}

export type VueSelectRemoteFunction = (search: string | null) => Promise<VueSelectOption[]>

export interface VueSelectProps {
  // clearable: boolean;
  closeOnSelect: boolean;
  // disabled?: boolean;
  label?: string;
  // labelField: string;
  multiple: boolean;
  name?: string;
  options: VueSelectOption[];
  placeholder?: string;
  // perPage: number;
  remote: boolean;
  remoteFunction?: (search: string | null) => Promise<VueSelectOption[]>;
  required: boolean;
  searchable: boolean;
  // valueField: string;
  value?: VueSelectValue;
  // hasPagination: boolean;
  selectedDisplayLimit: number;
}