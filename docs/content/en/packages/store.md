---
title: useStore
description: 'Access this.$store with the Nuxt Composition API.'
category: Packages
position: 12
version: 0.201
---

Vuex v4 [provides a helper function](https://next.vuex.vuejs.org/api/#usestore) for accessing it within the Composition API. This helper provides an equivalent while using Nuxt 2

## useStore

Returns `this.$store`.

```ts
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
  },
})
```

You can also provide an injection key or custom type to get back a semi-typed store:

```ts
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export default defineComponent({
  setup() {
    const store = useStore(key)
    const store = useStore<State>()
    // In both of these cases, store.state.count will be typed as a number
  },
})
```
