---
title: useAsync
description: '@nuxtjs/composition-api provides a way to use the Vue 3 Composition API with Nuxt-specific features.'
category: Helpers
fullscreen: True
position: 15
---

You can create reactive values that depend on asynchronous calls with `useAsync`.

On the server, this helper will inline the result of the async call in your HTML and automatically inject them into your client code. Much like `asyncData`, it _won't_ re-run these async calls client-side.

However, if the call hasn't been carried out on SSR (such as if you have navigated to the page after initial load), it returns a `null` ref that is filled with the result of the async call when it resolves.

```ts
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $http } = useContext()
    const posts = useAsync(() => $http.$get('/api/posts'))

    return { posts }
  },
})
```

<alert>

At the moment, `useAsync` is only suitable for one-offs, unless you provide your own unique key. [More information](/getting-started/gotchas#keyed-functions).

</alert>