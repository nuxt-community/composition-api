import { defineComponent as define } from '@vue/composition-api'

import { getHeadOptions } from './meta'

/**
 * If you want to enable `useMeta`, make sure to include `head: {}` in your component definition.
 * @example
  ```ts
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    head: {},
    setup() {
      ...
    }
  })
  ```
 */
export const defineComponent: typeof define = (options: any) => {
  if (!('head' in options)) return options

  return {
    ...options,
    ...getHeadOptions(options),
  }
}
