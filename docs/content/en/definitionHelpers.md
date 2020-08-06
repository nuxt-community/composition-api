---
---

# Definition helpers

There are some helpers to optimize developer experience when creating Nuxt plugins, middleware, server middleware and modules.

These helpers simply return the function passed into them, adding the correct typings.

## defineNuxtPlugin

Create a plugin with types with:

```ts
import { defineNuxtPlugin } from 'nuxt-composition-api'

export default defineNuxtPlugin((ctx) => {
  // do stuff
})
```

## defineNuxtMiddleware

Create middleware with types with:

```ts
import { defineNuxtMiddleware } from 'nuxt-composition-api'

export default defineNuxtMiddleware((ctx) => {
  // do stuff
})
```

## defineNuxtModule

Create a Nuxt module with types with:

```ts
import { defineNuxtModule } from 'nuxt-composition-api'

export default defineNuxtModule<{ myOption: boolean }>((moduleOptions) => {
  // do stuff
})
```


## defineNuxtServerMiddleware

Create server middleware with types with:

```ts
import { defineNuxtServerMiddleware } from 'nuxt-composition-api'

export default defineNuxtServerMiddleware((req, res, next) => {
  // do stuff
})
```

