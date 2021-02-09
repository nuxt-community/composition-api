---
title: onGlobalSetup
description: 'You can run functions (or provide data) in the global Nuxt setup() function.'
category: Lifecycle
fullscreen: True
position: 21

---

This helper will run a callback function in the global setup function.
 
```ts [~/plugins/myPlugin.js]
import { onGlobalSetup, provide } from '@nuxtjs/composition-api'

export default () => {
  onGlobalSetup(() => {
    provide('globalKey', true)
  })
}
```

<alert>This should be called from within a plugin rather than in a component context.</alert>
