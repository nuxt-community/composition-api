import { defineComponent as define } from '@vue/composition-api'

import { getHeadOptions } from './meta'

export const defineComponent: typeof define = (options: any) => {
  if (!('head' in options)) return options

  return {
    ...options,
    ...getHeadOptions(options),
  }
}
