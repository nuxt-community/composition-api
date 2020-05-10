---
---

# ssrRef

When creating composition utility functions, often there will be server-side state that needs to be conveyed to the client.

`ssrRef` will automatically add ref values to `window.__NUXT__` on SSR if they have been changed from their initial value. It can be used outside of components, such as in shared utility functions, and it supports passing a factory function that will generate the initial value of the ref.

```ts
import { ssrRef } from 'nuxt-composition-api'

const val = ssrRef('')

// When hard-reloaded, `val` will be initialised to 'server set'
if (process.server) val.value = 'server set'

// When hard-reloaded, the result of myExpensiveSetterFunction() will
// be encoded in nuxtState and used as the initial value of this ref.
// If client-loaded, the setter function will run to come up with initial value.
const val2 = ssrRef(myExpensiveSetterFunction)
```

::: tip
Under the hood, `ssrRef` requires a key to ensure that the ref values match between client and server. If you have added `nuxt-composition-api` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `nuxt-composition-api/babel` to your Babel plugins.
:::
