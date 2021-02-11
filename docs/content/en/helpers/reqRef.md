---
title: reqRef, reqSsrRef
description: 'You can define server-side refs that are reset on each request.'
category: Data
fullscreen: True
badge: deprecated
version: 0.133
position: 32
---

`reqRef` declares a normal `ref` with one key difference. It resets the value of this ref on each request. You can find out [more information here](/getting-started/gotchas#shared-server-state).

<alert>You do not need a `reqRef` if you are using an `ssrRef` within a component setup function as it will be automatically tied to the per-request state.</alert>

<alert type="warning">You should take especial care because of the danger of shared state when using refs in this way.</alert>

## Example

```ts[~/state/sampleModule.js]
import { reqRef } from '@nuxtjs/composition-api'

export const user = reqRef(null)

export const fetchUser = async () => {
    const r = await fetch('https://api.com/users')
    user.value = await r.json()
}
```
