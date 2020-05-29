---
---

# Quick start

1. First, install `nuxt-composition-api`:

   ```bash
   yarn add nuxt-composition-api

   # or npm

   npm install nuxt-composition-api --save
   ```

2. Enable the module in your `nuxt.config.js`.

   ```js
   {
     buildModules: [
       'nuxt-composition-api'
     ]
   }
   ```

   Note that [using `buildModules`](https://nuxtjs.org/api/configuration-modules#-code-buildmodules-code-) requires Nuxt >= 2.9. Just add it to your `modules` if you're on a lower version.

3. **Optional**. Currently [there's an issue with static site generation and async functions](https://github.com/nuxt-community/composition-api/issues/44) which means that you'll need to add time between pages being generated to allow for any async functions to resolve, if you are pre-generating any of your pages, in your `nuxt.config.js`:

  ```js
  {
    generate: {
      // choose to suit your project
      interval: 2000,
    }
  }
  ```

4. You're good to go!

::: tip

- The module automatically installs [`@vue/composition-api`](https://github.com/vuejs/composition-api) as a plugin, so you do not need to enable it separately, unless you are accessing Composition API methods in your layout components (outside of `setup()`).

- For convenience, this package also exports the [`@vue/composition-api`](https://github.com/vuejs/composition-api) methods and hooks, so you can import directly from `nuxt-composition-api`.
  :::
