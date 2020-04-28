<h1 align="center">nuxt-composition-api</h1>
<p align="center">Nuxt hooks for the Vue Composition API</p>

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

> Composition API hooks for Nuxt.

## Progress

> This is still an in-development package, and should definitely be regarded as alpha-level.

- [x] Support for new Nuxt `fetch()`
- [x] Access to Nuxt context
- [ ] `nuxtServerInit`
- [ ] test framework

## Quick Start

> This project requires usage of [`@vue/composition-api`](https://github.com/vuejs/composition-api). Make sure you've set that up correctly first.

First install `nuxt-composition-api`:

```bash
yarn add nuxt-composition-api

# or npm

npm install nuxt-composition-api --save
```

You will now be able to access the following hooks:

### useFetch

Versions of Nuxt newer than v2.12 support a [custom hook called `fetch`](https://nuxtjs.org/api/pages-fetch/) that allows server-side and client-side asynchronous data-fetching.

You can access this with this package as follows:

```ts
import { defineComponent, ref } from '@vue/composition-api'
import { useFetch } from 'nuxt-composition-api'
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
import { defineComponent, ref } from '@vue/composition-api'
import { withContext } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    withContext(({ store }) => {
      store.dispatch('myAction')
    })
  },
})
```

## Contributors

Contributions are very welcome.

## License

[MIT License](./LICENSE) - Copyright &copy; Daniel Roe
