---
title: useRoute, useRouter
description: 'Access this.$route and this.$router with the Nuxt Composition API.'
category: Packages
position: 12
---

In Vue 3, `vue-router` exports composition functions for accessing the current route and router.

These helpers provide an equivalent while using Nuxt 2

## useRoute

Returns `this.$route`.

```ts
import { defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const route = useRoute()
  }
})
```

## useRouter

Returns `this.$router`.

```ts
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()
  }
})
```
