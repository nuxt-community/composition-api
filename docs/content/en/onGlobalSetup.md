---
title: onGlobalSetup
description: '@nuxtjs/composition-api provides a way to use the Vue 3 Composition API with Nuxt-specific features.'
category: Helpers
fullscreen: True
---

This helper will run a callback function in the global setup function.
 
```ts[~/plugins/myPlugin.js]
import { onGlobalSetup } from '@nuxtjs/composition-api'

export default () => {
  onGlobalSetup(() => {
    provide('globalKey', true)
  })
}
```

<alert>
This should be called from within a plugin rather than in a component context.
</alert>