---
---

# `useStatic`

You can statically generate expensive functions using `useStatic`. 

1. If you are generating the whole app (or just prerendering some routes with `nuxt build && nuxt generate --no-build`) the following behaviour will be unlocked:
    * On generate, the result of a `useStatic` call will be saved to a JSON file and copied into the `/dist` directory.
    * On either client and server navigation to a generated page, this JSON will be fetched - and once fetched it will be cached for subsequent navigations.
    * If for whatever reason this JSON doesn't exist, such as if the page *wasn't* pre-generated, the original factory function will be run on client-side.

2. If the route is not pre-generated (including in dev mode), then:
    * On a hard-reload, the server will run the factory function and inline the result in `nuxtState` - so the client won't rerun the API request.
    * On client navigation, the client will run the factory function.

In both of these cases, the return result of `useStatic` is a `null` ref that is filled with the result of the factory function or JSON fetch when it resolves.

```ts
import { defineComponent, useContext, useStatic, computed } from 'nuxt-composition-api'
import axios from 'axios'

export default defineComponent({
  setup() {
    const { params } = useContext()
    const id = computed(() => params.value.id)
    const post = useStatic(
      id => axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`),
      id,
      'posts'
    )

    return { post }
  },
})
```