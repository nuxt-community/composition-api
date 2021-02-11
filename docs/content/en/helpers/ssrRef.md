---
title: ssrRef, shallowSsrRef
description: 'You can define data on the server that is stringified and hydrated on client-side.'
category: Data
fullscreen: True
position: 34
---

When creating composition utility functions, often there will be server-side state that needs to be conveyed to the client.

<alert>If initialised within `setup()` or via `onGlobalSetup`, `ssrRef` data will exist _only_ within the request state. If initialised _outside_ a component there is the possibility that an `ssrRef` may share state across requests.</alert>

## ssrRef

`ssrRef` will automatically add ref values to `window.__NUXT__` on SSR if they have been changed from their initial value. It can be used outside of components, such as in shared utility functions, and it supports passing a factory function that will generate the initial value of the ref.

```ts
import { ssrRef } from '@nuxtjs/composition-api'

const val = ssrRef('')

// When hard-reloaded, `val` will be initialised to 'server set'
if (process.server) val.value = 'server set'

// When hard-reloaded, the result of myExpensiveSetterFunction() will
// be encoded in nuxtState and used as the initial value of this ref.
// If client-loaded, the setter function will run to come up with initial value.
const val2 = ssrRef(myExpensiveSetterFunction)
```

<alert type="info">

Under the hood, `ssrRef` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/babel` to your Babel plugins.

</alert>

<alert>

At the moment, an `ssrRef` is only suitable for one-offs, unless you provide your own unique key. [More information](/getting-started/gotchas#keyed-functions).

</alert>

## shallowSsrRef

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

At the moment, a `shallowSsrRef` is only suitable for one-offs, unless you provide your own unique key. [More information](/getting-started/gotchas#keyed-functions).

</alert>
