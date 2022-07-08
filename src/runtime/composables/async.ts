import { isRef, onServerPrefetch } from 'vue'
import type { Ref } from 'vue'

import { globalNuxt } from '@nuxtjs/composition-api/dist/runtime/globals'
import { ssrRef } from './ssr-ref'
import { validateKey } from './utils'

/**
 * You can create reactive values that depend on asynchronous calls with `useAsync`.
 * On the server, this helper will inline the result of the async call in your HTML and automatically inject them into your client code. Much like `asyncData`, it _won't_ re-run these async calls client-side.
 *
 * However, if the call hasn't been carried out on SSR (such as if you have navigated to the page after initial load), it returns a `null` ref that is filled with the result of the async call when it resolves.
 *
 * **At the moment, `useAsync` is only suitable for one-offs, unless you provide your own unique key.**
 * @param cb The async function that will populate the ref this function returns.
 * @param key Under the hood, `useAsync` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/dist/babel-plugin` to your Babel plugins.
 *
 * @example
  ```ts
  import { defineComponent, useAsync, computed } from '@nuxtjs/composition-api'
  import axios from 'axios'

  export default defineComponent({
    setup() {
      const posts = useAsync(() => axios.get('/api/posts'))

      return { posts }
    },
  })
  ```
 */
export const useAsync = <T>(
  cb: () => T | Promise<T>,
  key?: string | Ref<null>
): Ref<null | T> => {
  validateKey(key)

  const _ref = isRef(key) ? key : ssrRef<T | null>(null, key)

  if (
    !_ref.value ||
    (process.env.NODE_ENV === 'development' &&
      process.client &&
      window[globalNuxt]?.context.isHMR)
  ) {
    const p = Promise.resolve(cb())

    if (process.server) {
      onServerPrefetch(async () => {
        _ref.value = await p
      })
    } else {
      // eslint-disable-next-line
      p.then(res => (_ref.value = res))
    }
  }

  return _ref as Ref<null | T>
}
