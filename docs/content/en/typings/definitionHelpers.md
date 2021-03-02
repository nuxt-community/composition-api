---
title: defineNuxt*
description: 'You can get automatic type-hinting for Nuxt configuration, plugins, middleware, modules and serverMiddleware.'
category: Typings
position: 10
version: 0.201
---

There are some helpers to optimize developer experience when creating Nuxt plugins, middleware, server middleware and modules.

These helpers simply return the function or object passed into them, adding the correct typings.

## defineNuxtConfig

Create your `nuxt.config.js` with types with:

```ts
import { defineNuxtConfig } from '@nuxtjs/composition-api'

export default defineNuxtConfig({
  // your nuxt config
})
```

<alert type="warning">Note that if you define your Nuxt config this way you will need to ensure that `@nuxtjs/composition-api` is present in your `dependencies` rather than `devDependencies`.</alert>

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

## defineNuxtModule

Create a Nuxt module with types with:

```ts
import { defineNuxtModule } from '@nuxtjs/composition-api'

export default defineNuxtModule<{ myOption: boolean }>(moduleOptions => {
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
