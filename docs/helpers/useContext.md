---
---

# `useContext`

You can access the Nuxt context more easily using `useContext`, which will return the Nuxt context.

```ts
import { defineComponent, ref, useContext } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    store.dispatch('myAction')
  },
})
```

::: tip
Note that `route`, `query`, `from` and `params` are reactive refs (accessed with `.value`), but the rest of the context is not.
:::
