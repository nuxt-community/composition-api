<h1 align="center">nuxt-composition-api</h1>
<p align="center">Composition API hooks for Nuxt</p>

<p align="center">
<a href="https://npmjs.com/package/nuxt-composition-api">
    <img alt="" src="https://img.shields.io/npm/v/nuxt-composition-api/latest.svg?style=flat-square">
</a>
<a href="https://bundlephobia.com/result?p=nuxt-composition-api">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/nuxt-composition-api?style=flat-square">
</a>
<a href="https://npmjs.com/package/nuxt-composition-api">
    <img alt="" src="https://img.shields.io/npm/dt/nuxt-composition-api.svg?style=flat-square">
</a>
<a href="https://lgtm.com/projects/g/danielroe/nuxt-composition-api">
    <img alt="" src="https://img.shields.io/lgtm/alerts/github/danielroe/nuxt-composition-api?style=flat-square">
</a>
<a href="https://lgtm.com/projects/g/danielroe/nuxt-composition-api">
    <img alt="" src="https://img.shields.io/lgtm/grade/javascript/github/danielroe/nuxt-composition-api?style=flat-square">
</a>
<a href="https://david-dm.org/danielroe/nuxt-composition-api">
    <img alt="" src="https://img.shields.io/david/danielroe/nuxt-composition-api.svg?style=flat-square">
</a>
</p>

[Live demo](https://composition-api.now.sh) · [CodeSandbox](https://codesandbox.io/s/github/danielroe/nuxt-composition-api/tree/master/example).

## Features

- **Nuxt `fetch()`** Support for new Nuxt `fetch()` (v2.12+)
- **Component context** Easy access to `router`, `app`, `store` within `setup()`
- **Plugin** Declare and run async Nuxt plugins within your `.vue` files

## Quick Start

First install `nuxt-composition-api`:

```bash
yarn add nuxt-composition-api

# or npm

npm install nuxt-composition-api --save
```

Enable the module in your `nuxt.config.js`

```
{
  buildModules: [
    'nuxt-composition-api'
  ]
}
```

The module automatically installs [`@vue/composition-api`](https://github.com/vuejs/composition-api) as a plugin, so you shouldn't need to do so separately.

You will now be able to access the following hooks:

### useFetch

Versions of Nuxt newer than v2.12 support a [custom hook called `fetch`](https://nuxtjs.org/api/pages-fetch/) that allows server-side and client-side asynchronous data-fetching.

You can access this with this package as follows:

```ts
import { defineComponent, ref, useFetch } from 'nuxt-composition-api'
import axios from 'axios'

export default defineComponent({
  setup() {
    const name = ref('')

    useFetch(async () => {
      name.value = await axios.get('https://myapi.com/name')
    })
  },
})
```

### withContext

You can access the Nuxt context more easily using `withContext`, which runs synchronously within the setup function.

```ts
import { defineComponent, ref, withContext } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    withContext(({ store }) => {
      store.dispatch('myAction')
    })
  },
})
```

### useAsyncPlugin

With this hook, you can register a global plugin. However, it will only be registered/run when that source file (whether `.vue` or `.js`) is loaded into memory. So if declared in an async component or a lazy-loaded route, it will only be called when that component or route is loaded.

You can call this hook outside of `setup()`, in which case it will be run before the component is initialised. If called within setup, it will run synchronously.

```ts
import { defineComponent, ref, useAsyncPlugin } from 'nuxt-composition-api'

useAsyncPlugin(({ route, redirect }) => {
  // This will run before the component setup() function -- whenever the
  // chunk containing this `.vue` file is loaded.
  if (route.query.redirect === 'true' && route.path === '/here')
    redirect(301, '/other-page')
})

export default defineComponent({
  setup() {
    // This will run immediately
    useAsyncPlugin(({ route, redirect }) => {
      if (route.query.redirect === 'true') redirect(301, '/other-page')
    })
  },
})
```

### Additional `@vue/composition-api` functions

For convenience, this package also exports the [`@vue/composition-api`](https://github.com/vuejs/composition-api) methods and hooks, so you can import directly from `nuxt-composition-api`.

```ts
import { defineComponent, ref } from 'nuxt-composition-api'
```

## Contributors

Contributions are very welcome.

Clone this repo

```
git clone git@github.com:danielroe/nuxt-composition-api.git
```

Install dependencies and build project

```
yarn install

yarn build
```

**Tip:** You can use `yarn link` to test the module locally with your nuxt project.

## License

[MIT License](./LICENSE) - Copyright &copy; Daniel Roe
