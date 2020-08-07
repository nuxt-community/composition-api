---
title: useContext
description: '@nuxtjs/composition-api provides a way to use the Vue 3 Composition API with Nuxt-specific features.'
category: Helpers
fullscreen: True
---

You can access the Nuxt context more easily using `useContext`, which will return the Nuxt context.

```ts
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    store.dispatch('myAction')
  },
})
```

<alert type="info">

Note that `route`, `query`, `from` and `params` are reactive refs (accessed with `.value`), but the rest of the context is not.

</alert>
