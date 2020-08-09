---
title: shallowSsrRef
description: '@nuxtjs/composition-api provides a way to use the Vue 3 Composition API with Nuxt-specific features.'
category: Helpers
fullscreen: True
---

This helper creates a [`shallowRef`](https://vue-composition-api-rfc.netlify.app/api.html#shallowref) (a ref that tracks its own .value mutation but doesn't make its value reactive) that is synced between client & server.

```ts
import { shallowSsrRef, onMounted } from '@nuxtjs/composition-api'

const shallow = shallowSsrRef({ v: 'init' })
if (process.server) shallow.value = { v: 'changed' }

// On client-side, shallow.value will be { v: changed }
onMounted(() => {
  // This and other changes outside of setup won't trigger component updates.
  shallow.value.v = 'Hello World'
})
```

<alert>

At the moment, an `shallowSsrRef` is only suitable for one-offs, unless you provide your own unique key.

This is because server and client `shallowSsrRef` matches up based on line number within your code.

```ts
function useMyFeature() {
  // Only one unique key is generated
  const feature = shallowSsrRef('')
  return feature
}

const a = useMyFeature()
const b = useMyFeature()

b.value = 'changed'
// On client-side, a's value will also be initialised to 'changed'
```

If you want to use this pattern, make sure to set a unique key based on each calling of the function.

</alert>
