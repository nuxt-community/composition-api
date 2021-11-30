<h1 align="center">🏗️ Nuxt Composition API</h1>
<p align="center">Composition API hooks for Nuxt</p>

<p align="center">
<a href="https://npmjs.com/package/@nuxtjs/composition-api">
    <img alt="" src="https://img.shields.io/npm/v/@nuxtjs/composition-api/latest.svg?style=flat-square">
</a>
<a href="https://bundlephobia.com/result?p=@nuxtjs/composition-api">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/@nuxtjs/composition-api?style=flat-square">
</a>
<a href="https://npmjs.com/package/@nuxtjs/composition-api">
    <img alt="" src="https://img.shields.io/npm/dt/@nuxtjs/composition-api.svg?style=flat-square">
</a>
<a href="https://lgtm.com/projects/g/nuxt-community/composition-api">
    <img alt="" src="https://img.shields.io/lgtm/alerts/github/nuxt-community/composition-api?style=flat-square">
</a>
<a href="https://lgtm.com/projects/g/nuxt-community/composition-api">
    <img alt="" src="https://img.shields.io/lgtm/grade/javascript/github/nuxt-community/composition-api?style=flat-square">
</a>
<a href="https://david-dm.org/nuxt-community/composition-api">
    <img alt="" src="https://img.shields.io/david/nuxt-community/composition-api.svg?style=flat-square">
</a>
</p>

> `@nuxtjs/composition-api` provides a way to use the Vue 3 Composition API in with Nuxt-specific features.

---

**Nuxt Bridge has now been released in beta.** It has full composition API support and it's strongly recommended to migrate from `@nuxtjs/composition-api`, if possible, by following the steps in [the Bridge migration guide](https://v3.nuxtjs.org/getting-started/bridge/). Feedback welcome at `https://github.com/nuxt-community/composition-api/discussions/585`.

---

## Features

- 🏃 **Fetch**: Support for the new Nuxt `fetch()` in v2.12+
- ℹ️ **Context**: Easy access to `router`, `app`, `store` within `setup()`
- 🗺️ **Head**: Interact directly with your `vue-meta` properties within `setup()`
- ✨ **Automatic hydration**: Drop-in replacement for `ref` with automatic SSR stringification and hydration (`ssrRef`)
- 📝 **SSR support**: Allows using the Composition API with SSR
- 💪 **TypeScript**: Written in TypeScript

<p align="center">
<a href="https://composition-api.nuxtjs.org/">Read Documentation</a>
</p>

## Contributors

Contributions are very welcome.

1. Clone this repo

   ```bash
   git clone git@github.com:nuxt-community/composition-api.git
   ```

2. Install dependencies and build project

   ```bash
   yarn
   # Compile library and watch for changes
   yarn watch
   # Start a test Nuxt fixture with hot reloading
   yarn fixture
   # Test
   yarn test
   ```

**Tip:** You can also use `yarn link` to test the module locally with your Nuxt project.

## License

[MIT License](./LICENCE) - Copyright &copy; Daniel Roe
