import { ref, Ref } from '@vue/composition-api'

import { ssrNamespace, SsrNamespace } from './ssr-namespace'

function getValue<T>(value: any): T {
  if (typeof value === 'function') return value()
  return value
}

let ssrRefs: null | SsrNamespace = null

/**
 * Creates a Ref wich is in sync with the client.
 *
 * DON'T USE THIS FOR ALL YOUR REFS ONLY WHEN THEY GET CHANGED ON THE SERVER!
 */
export const ssrRef = <T>(value: T, key?: string): Ref<T> => {
  if (!ssrRefs) {
    ssrRefs = ssrNamespace('ssrRefs')
  }

  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )
  }

  const ssr = ssrRefs(key)

  if (process.server) {
    return ssr.serverCreateRef(getValue<T>(value)) as Ref<T>
  } else {
    const ssrValue = ssr.clientGet(getValue<T>(value))

    return ref(ssrValue)
  }
}
