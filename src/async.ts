import { Ref, onServerPrefetch } from '@vue/composition-api'
import { Context } from '@nuxt/types'

import { withContext } from './context'
// import { ssrNamespace } from './ssr-namespace'
import { ssrRef } from './ssr-ref'

// const ssrAsync = ssrNamespace('async')

/**
 * TODO: key = route of the page e.g. /test/:id or the name of the component
 * Might be not needed with Vue 3 when async setup is OK for pages
 */
export function useAsync<T>(
  cb: (context: Context) => Promise<T> | T,
  key: string
): Ref<T> {
  const data = ssrRef<T | null>(null, 'async_' + key)

  withContext(ctx => {
    if (process.server) {
      onServerPrefetch(async () => {
        data.value = await cb(ctx)
      })
    } else if (!data.value) {
      const p = cb(ctx)

      if (p instanceof Promise) {
        p.then(res => (data.value = res))
      } else {
        data.value = p
      }
    }
  })

  return data as Ref<T>
}
