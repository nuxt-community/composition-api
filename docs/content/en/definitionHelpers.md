---
title: Definition helpers
description: '@nuxtjs/composition-api provides a way to use the Vue 3 Composition API with Nuxt-specific features.'
category: Helpers
position: 3
---

There are some helpers to optimize developer experience when creating Nuxt plugins, middleware, server middleware and modules.

These helpers simply return the function passed into them, adding the correct typings.

## defineNuxtPlugin

Create a plugin with types with:

```ts
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin((ctx) => {
  // do stuff
})
```

## defineNuxtMiddleware

Create middleware with types with:

```ts
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware((ctx) => {
  // do stuff
})
```

## defineNuxtModule

Create a Nuxt module with types with:

```ts
import { defineNuxtModule } from '@nuxtjs/composition-api'

export default defineNuxtModule<{ myOption: boolean }>((moduleOptions) => {
  // do stuff
})
```


## defineNuxtServerMiddleware

Create server middleware with types with:

```ts
import { defineNuxtServerMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtServerMiddleware((req, res, next) => {
  // do stuff
})
```

