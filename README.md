# Vue Select 41 `v0.0.1`

Vue Select 41 is a component that provides a wrapper around the HTML select element with enhanced capabilities. This component supports:

- Searching
- AJAX Support
- Single/Multiple options
- Customizing with slots and CSS variables

## Get started

Install:
```bash
npm i vue-select-41
```

In main Vue file:
```js
import { VueSelect } from 'vue-select-41';
import 'vue-select-41/dist/style.css';

Vue.component('v-select', VueSelect);
```
    
Or in another Vue component;
```vue
<script lang="js">
import { VueSelect } from 'vue-select-41'
import 'vue-select-41/dist/style.css'

export default {
  name: 'SomeComponent',
  components: { VueSelect },
  data() {
    return {
      value: null,
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
        { value: '5', label: 'Option 5' },
      ],
    }
  },
}
</script>

<template>
  <vue-select
    v-model="value"
    :options="options"
    label="Field label"
  />
</template>
```

## Props

### `closeOnSelect`
Close the dropdown when an option is selected

```js
closeOnSelect: {
  type: Boolean,
  default: true,
}
`````````

### `disabled`
Disable the component.

```js
disabled: {
  type: Boolean,
  default: false,
}
```

### `label`
Label text value.

```js
label: {
  type: String,
  required: false,
}
```

### `multiple`
Allow multiple selections.

```js
multiple: {
  type: Boolean,
  default: false,
}
```

### `name`
Name attribute for the select element.

```js
name: {
  type: String,
  required: false,
}
```

### `options`
Array of options to display in the dropdown. By default, each item should be an object of the form `{ value: string, label: string }`.

```js
options: {
  type: Array,
  default: () => [],
}
```

### `placeholder`
Placeholder text for the input field.

```js
placeholder: {
  type: String,
  required: false,
}
```

### `remote`
Enable remote data loading.

```js
remote: {
  type: Boolean,
  default: false,
}
```

### `remoteFunction`
Function to fetch remote data. It should return a promise with an array of valid option items `{ value: string, label: string }`.
To implement a searching, you can pass the `search` argument to the function. The search value should be a `string`, `null`, or `undefined`.

```js
remoteFunction: {
  type: Function,
  required: false,
}
```

### `required`
Mark the select as required.

```js
required: {
  type: Boolean,
  default: false,
}
```

### `searchable`
Allow searching through the options.

```js
searchable: {
  type: Boolean,
  default: true,
}
```

### `value`
Current selected value(s). Depending on the select type (single/multiple), the value can be an object `{ value: string, label: string }` or an array of such objects. 

```js
value: {
  type: [Object, Array],
  required: false,
}
```

### `selectedDisplayLimit`
Limit the number of selected items displayed.

```js
selectedDisplayLimit: {
  type: Number,
  default: 3,
}
```

## Events

### `input`
Triggered when the selected options change. Use it with v-model.

### `dropdown:opened`
Triggered when the dropdown opens

### `dropdown:closed`
Triggered when the dropdown closes.


## Slots

### `option`
This slot is used to display options in the dropdown.

- `item { value: string, label: string }` - displayed option
- `selected {boolean}` - is the option selected

```vue
<template #option="{ item, selected}">
  <div class="item" :class="{ 'item--selected': selected }">
    {{ item }}
  </div>
</template>
```

### `no options`
This slot used when there are no options to display.

```vue
<template #noOptions>
  <div class="custom-class">
    No results found
  </div>
</template>
```