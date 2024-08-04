export type TVueSelectValue = TVueSelectValueItem[] | TVueSelectValueItem | null
export type TVueSelectSingleValue = TVueSelectValueItem | null
export type TVueSelectMultipleValue = TVueSelectValueItem[]

export type TVueSelectValueItem = {
  value: string
  label: string
}

export interface IVueSelectOption extends TVueSelectValueItem {
  [key: string]: any
}

export type TVueSelectRemoteFunction = (search: String | null) => Promise<IVueSelectOption[]>

export interface IVueSelectProps {
  // clearable: boolean;
  closeOnSelect: boolean;
  // disabled?: boolean;
  label?: string;
  // labelField: string;
  multiple: boolean;
  name?: string;
  options: IVueSelectOption[];
  placeholder?: string;
  // perPage: number;
  remote: boolean;
  remoteFunction?: (search: String | null) => Promise<IVueSelectOption[]>;
  required: boolean;
  // valueField: string;
  value?: TVueSelectValue;
  // hasPagination: boolean;
  selectedDisplayLimit: number;
}