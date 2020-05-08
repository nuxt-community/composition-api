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

   ```
   {
     buildModules: [
       'nuxt-composition-api'
     ]
   }
   ```

   Note that [using `buildModules`](https://nuxtjs.org/api/configuration-modules#-code-buildmodules-code-) requires Nuxt >= 2.9. Just add it to your `modules` if you're on a lower version.

3. You're good to go!

::: tip

- The module automatically installs [`@vue/composition-api`](https://github.com/vuejs/composition-api) as a plugin, so you do not need to enable it separately.

- For convenience, this package also exports the [`@vue/composition-api`](https://github.com/vuejs/composition-api) methods and hooks, so you can import directly from `nuxt-composition-api`.
  :::
