---
title: defineNuxt*
description: 'You can get automatic type-hinting for Nuxt configuration, plugins, middleware, modules and serverMiddleware.'
category: Typings
position: 10
version: 0.225
---

There are some helpers to optimize developer experience when creating Nuxt plugins, middleware, server middleware and modules.

These helpers simply return the function or object passed into them, adding the correct typings.

## defineNuxtPlugin

Create a plugin with types with:

```ts
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(ctx => {
  // do stuff
})
```

## defineNuxtMiddleware

Create middleware with types with:

```ts
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(ctx => {
  // do stuff
})
```
