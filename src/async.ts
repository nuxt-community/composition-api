import { ssrRef } from './ssr-ref'
import { onServerPrefetch } from './server-prefetch'
import { Ref, isRef } from '@vue/composition-api'

export const useAsync = <T>(
  cb: () => T | Promise<T>,
  key?: string | Ref<null>
): Ref<null | T> => {
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding 'nuxt-composition-api/babel' to your Babel plugins."
    )
  }
  
  const _ref = isRef(key) ? key : ssrRef<T | null>(null, key)

  if (!_ref.value) {
    const p = cb()

    if (p instanceof Promise) {
      if (process.server) {
        onServerPrefetch(async () => {
          _ref.value = await p
        })
      } else {
        // eslint-disable-next-line
        p.then(res => (_ref.value = res))
      }
    } else {
      _ref.value = p
    }
  }

  return _ref as Ref<null | T>
}
