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
- **Plugin** Declare and run local Nuxt plugins within your components

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

### useLocalPlugin

With this hook, you can add a 'plugin' that will be run when a component or page is loaded. It will be run SSR and on initial page load. If a component is loaded asynchronously or a page is lazy-loaded, the plugin will be run in its `created()` lifecycle hook. It receives the same arguments as a [Nuxt plugin](https://nuxtjs.org/guide/plugins/) - but you are not guaranteed it will run before instantiating the root Vue.js Application.

```ts
import { defineComponent, ref, useLocalPlugin } from 'nuxt-composition-api'

// This will be run at the same time as other global Nuxt plugins, if the page
// or component is synchronously loaded on initial render. Otherwise, it will be
// loaded at the moment this component's JS is run (before created()).
useLocalPlugin(({ route, redirect }) => {
  if (route.query.redirect === 'true') redirect(301, '/other-page')
})

export default defineComponent({
  setup() {
    // This will run in the created() hook of this component
    useLocalPlugin(({ route, redirect }) => {
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
