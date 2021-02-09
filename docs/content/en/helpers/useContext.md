---
title: useContext
description: 'You can access the Nuxt context within the composition API'
category: API
fullscreen: True
position: 36
---

You can access the Nuxt context more easily using `useContext`, which will return the Nuxt context.

```ts
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    store.dispatch('myAction')
  },
})
```

<alert type="info">

Note that `route`, `query`, `from` and `params` are reactive refs (accessed with `.value`), but the rest of the context is not.

</alert>
