---
title: ssrPromise
description: 'You can create promises on the server that are resolved on the client'
category: Data
fullscreen: True
position: 33
---

`ssrPromise` runs a promise on the server and serialises the result as a resolved promise for the client. It needs to be run within the `setup()` function but note that it returns a promise which will require special handling. (For example, you cannot just return a promise from setup and use it in the template.)

```ts
import {
  defineComponent,
  onBeforeMount,
  ref,
  ssrPromise,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const _promise = ssrPromise(async () => myAsyncFunction())
    const resolvedPromise = ref(null)

    onBeforeMount(async () => {
      resolvedPromise.value = await _promise
    })

    return {
      // On the server, this will be null until the promise resolves.
      // On the client, if server-rendered, this will always be the resolved promise.
      resolvedPromise,
    }
  },
})
```

<alert type="info">

Under the hood, `ssrPromise` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/babel` to your Babel plugins.

</alert>

<alert>

At the moment, an `ssrPromise` is only suitable for one-offs, unless you provide your own unique key. [More information](/getting-started/gotchas#keyed-functions).

</alert>
