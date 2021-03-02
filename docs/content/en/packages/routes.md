---
title: useRoute, useRouter
description: 'Access this.$route and this.$router with the Nuxt Composition API.'
category: Packages
position: 12
version: 0.201
---

In Vue 3, `vue-router` exports composition functions for accessing the current route and router.

These helpers provide an equivalent whilst using Nuxt 2.

## useRoute

Returns `this.$route`, wrapped in a computed - so accessible from `.value`.

```ts
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.id)
  },
})
```

<alert>When migrating to Nuxt 3 you will need to remove `.value` as the native equivalent returns a reactive object, not a computed object.</alert>

## useRouter

Returns `this.$router`.

```ts
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const router = useRouter()
    router.push('/')
  },
})
```
