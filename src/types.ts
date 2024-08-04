export type TValue = {
  value: string
  label: string
}

export interface ISelectOption extends TValue {
  [key: string]: any
}

export type TRemoteFunction = (search: String | null) => Promise<ISelectOption[]>
