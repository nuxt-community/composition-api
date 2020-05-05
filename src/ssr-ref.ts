import { ref, Ref } from '@vue/composition-api'

import { ssrNamespace } from './ssr-namespace'

function getValue<T>(value: any): T {
  if (typeof value === 'function') return value()
  return value
}

const ssrRefs = ssrNamespace('ssrRefs')

export const ssrRef = <T>(value: T, key?: string): Ref<T> => {
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )
  }

  const ssr = ssrRefs<T>(key)

  if (process.server) {
    return ssr.createRef(getValue<T>(value))
  } else {
    const ssrValue = ssr.clientGet(getValue<T>(value))

    return ref(ssrValue)
  }
}
