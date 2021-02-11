---
title: Gotchas
description: 'There are a couple of key points to remember when using the composition API.'
category: Getting started
fullscreen: True
position: 3
version: 0.133
---

There are a couple of points that you should be aware of when using `@nuxtjs/composition-api`.

## **'Keyed' functions**

A number of helper functions use a key to pass JSON-encoded information from server to client (currently `shallowSsrRef`, `ssrPromise`, `ssrRef` and `useAsync`).

In order to make that possible, under the hood this library adds a key based on line number within your code.

If you want to use these functions within global composables, make sure to set a unique key based on each calling of the function - for example, you might key it to the route path. (Each function takes an optional second parameter that is this key.)

If you don't provide a unique key, this is the consequence:

```ts
function useMyFeature() {
  // Only one unique key is generated, no matter
  // how many times this function is called.
  const feature = ssrRef('')

  return feature
}

const a = useMyFeature()
const b = useMyFeature()

b.value = 'changed'
// On client-side, a's value will also be initialised to 'changed'
```

Here is how you might implement it by setting a key.

```ts
function useMyFeature(path: string) {
  const content = useAsync(
    () => fetch(`https://api.com/slug/${path}`).then(r => r.json()),
    path
  )

  return {
    content,
  }
}

export default useMyFeature
```

## **Shared server state**

If you are declaring refs in the global state of your application - such as within plugins or in state/store files (for example, as a replacement for Vuex) - you should be aware that these refs are persisted across requests when your site is in production mode.

You should take especial care with declaring refs in this way.
