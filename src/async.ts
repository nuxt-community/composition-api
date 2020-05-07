import { ssrRef } from './ssr-ref'
import { onServerPrefetch } from './server-prefetch'
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
        // TODO: handle router and catch
        // eslint-disable-next-line
        p.then(res => (_ref.value = res))
      }
    } else {
      _ref.value = p
    }
  }

  return _ref
}
