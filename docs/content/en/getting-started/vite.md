---
title: Using with Vite
description: 'Using the Nuxt Composition API with Vite.'
category: Getting started
position: 4
version: 0.203
---

It is possible to use `@nuxtjs/composition-api` with [`nuxt-vite`](https://vite.nuxtjs.org/). In order to do so you will need to:

1. Add `getCompositionApiKey()` as the final argument to `useStatic`, `shallowSsrRef`, `ssrPromise`, `ssrRef`, `reqSsrRef`, `useAsync` (instead of the automagical babel plugin). This will work even if you later remove `nuxt-vite`.

   For example:

   ```ts
   import {
     defineComponent,
     getCompositionApiKey,
     useAsync,
     useContext,
   } from '@nuxtjs/composition-api'

   export default defineComponent({
     setup() {
       const { $http } = useContext()
       // Previously was:
       // const posts = useAsync(() => $http.$get('/api/posts'))
       const posts = useAsync(() => $http.$get('/api/posts'), getCompositionApiKey())

       return { posts }
     },
   })
   ```

2. Install `@vue/composition-api` as a top level dependency of your project rather than relying on the version provided by `@nuxtjs/composition-api`.

    <code-group>
    <code-block label="Yarn" active>

   ```bash
   yarn add @vue/composition-api
   ```

   </code-block><code-block label="NPM">

   ```bash
   npm install @vue/composition-api
   ```

   </code-block>
   </code-group>
