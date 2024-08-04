import { onMounted } from 'vue'
import { IProps } from '../conf/props'

export function useWarnings(props: IProps) {
  onMounted(() => {
    if (props.remote && props.options.length) {
      console.warn(
        'Vue Select: When the `remote` value is set to true, there is no need to specify the `options` prop.',
      )
    }

    if (!props.remote && props.remoteFunction) {
      console.warn(
        'Vue Select: When the `remote` value is set to false, there is no need to specify the `remoteFunction` prop.',
      )
    }

    if (props.remote && !props.remoteFunction) {
      console.error(
        'Vue Select: When the "remote" parameter is set to true, the "remote function" prop must be specified.',
      )
    }
  })
}
