---
---

# useFetch

Versions of Nuxt newer than v2.12 support a [custom hook called `fetch`](https://nuxtjs.org/api/pages-fetch/) that allows server-side and client-side asynchronous data-fetching.

You can access this with this package as follows:

```ts
import { defineComponent, ref, useFetch } from 'nuxt-composition-api'
import axios from 'axios'

export default defineComponent({
  setup() {
    const name = ref('')

    useFetch(async () => {
      name.value = await axios.get('https://myapi.com/name')
    })

    return { name }
  },
})
```

::: warning
`useFetch` must be called synchronously within `setup()`. Any changes made to component data - that is, to properties _returned_ from `setup()` - will be sent to the client and directly loaded. Other side-effects of `useFetch` hook will not be persisted.
:::
