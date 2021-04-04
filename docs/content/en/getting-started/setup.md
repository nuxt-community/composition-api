---
title: Quick start
description: 'Getting started with the Nuxt Composition API.'
category: Getting started
position: 2
version: 0.161
---

## Quick start

1. First, install `@nuxtjs/composition-api`:

    <code-group>
    <code-block label="Yarn" active>

   ```bash
   yarn add @nuxtjs/composition-api
   ```

   </code-block><code-block label="NPM">

   ```bash
   npm install @nuxtjs/composition-api --save
   ```

   </code-block>
   </code-group>

2. Enable the module.

   ```js[nuxt.config.js]
   {
     buildModules: [
       '@nuxtjs/composition-api'
     ]
   }
   ```

   Note that [using `buildModules`](https://nuxtjs.org/api/configuration-modules#-code-buildmodules-code-) requires Nuxt >= 2.9. Just add it to your `modules` if you're on a lower version.

3. **Optional**. Currently [there's an issue with static site generation and async functions](https://github.com/nuxt-community/composition-api/issues/44) which means that you'll need to add time between pages being generated to allow for any async functions to resolve, if you are pre-generating any of your pages:

   ```js[nuxt.config.js]
   {
     generate: {
       // choose to suit your project
       interval: 2000,
     }
   }
   ```

4. You're good to go!

<alert type="info">

- The module automatically installs [`@vue/composition-api`](https://github.com/vuejs/composition-api) as a plugin, so you do not need to enable it separately.

- For convenience, this package also exports the [`@vue/composition-api`](https://github.com/vuejs/composition-api) methods and hooks, so you can import directly from `@nuxtjs/composition-api`.

</alert>

## Testing with Jest

If you need to use jest tests with this module installed, just add the following lines to your `jest.config.js`:

```js{}[jest.config.js]
moduleNameMapper: {
  '@nuxtjs/composition-api': '@nuxtjs/composition-api/entrypoint',
},
```
