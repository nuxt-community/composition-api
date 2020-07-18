---
---

# defineNuxt... helpers

We added some helpers to optimize developer experience.

## defineNuxtPlugin

Create a Nuxt plugin with types with

```ts
import { defineNuxtPlugin } from 'nuxt-composition-api'

export default defineNuxtPlugin((ctx) => {
  // do stuff
})
```

## defineNuxtMiddleware

Create a Nuxt plugin with types with

```ts
import { defineNuxtMiddleware } from 'nuxt-composition-api'

export default defineNuxtMiddleware((ctx) => {
  // do stuff
})
```

## defineNuxtModule

Create a Nuxt plugin with types with

```ts
import { defineNuxtModule } from 'nuxt-composition-api'

export default defineNuxtModule<{myOption: boolean}>((moduleOptions) => {
  // do stuff
})
```


## defineNuxtServerMiddleware

Create a Nuxt plugin with types with

```ts
import { defineNuxtServerMiddleware } from 'nuxt-composition-api'

export default defineNuxtServerMiddleware((req, res, next) => {
  // do stuff
})
```

