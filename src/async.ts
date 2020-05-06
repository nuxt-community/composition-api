import { onServerPrefetch } from '@vue/composition-api'
import { ssrRef } from './ssr-ref'
import { useContext } from './context'
export const useAsync = <T>(cb: () => T | Promise<T>) => {
  const { route } = useContext()

  const _ref = ssrRef<T | null>(null, route.fullPath)

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

  return _ref
}
