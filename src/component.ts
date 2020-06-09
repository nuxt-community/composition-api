import { defineComponent as define } from '@vue/composition-api'

import { getHeadOptions } from './meta'
import { isComputed } from './computed'

/**
 * If you want to enable `useMeta`, make sure to include `head: {}` in your component definition.
 * @example
  ```ts
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    head: {},
    setup() {
      ...
    }
  })
  ```
 */
export const defineComponent: typeof define = (options: any) => {
  if (options.setup) {
    const old = options.setup

    options.setup = (...args: any[]) => {
      const res = old(...args)

      const __n_comp = Object.keys(res).filter(key => isComputed(res[key]))

      return { ...res, __n_comp }
    }
  }

  if (!('head' in options)) return define(options)

  return define({
    ...options,
    ...getHeadOptions(options),
  })
}
