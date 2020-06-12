---
---

# onGlobalSetup

This helper will run a callback function in the global setup function.
 
```ts
import { onGlobalSetup } from 'nuxt-composition-api'

export default () => {
  onGlobalSetup(() => {
    provide('globalKey', true)
  })
}
```

::: warning
This should be called from within a plugin rather than in a component context.
:::