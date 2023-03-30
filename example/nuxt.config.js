import fetch from 'node-fetch'
const serverlessEnvironment = !!process.env.NOW_BUILD

/** @type {import('@nuxt/types').NuxtConfig} */
export default {
  server: {
    port: process.env.PORT || 8000,
  },
  target: 'static',
  plugins: ['@/plugins/vue-placeholders.js'],
  modules: ['@nuxt/http'],
  ...(serverlessEnvironment ? {
    router: {
      base: '/example/',
    },
    build: {
      publicPath: 'example',
    },
  } : {}),
  buildModules: ['@nuxtjs/composition-api/module'],
  generate: {
    interval: 2000,
    async routes() {
      /** @type {{ userId: number, id: number, title: string, body: string }[]} */
      const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(d => d.slice(0, 20))
      const routes = posts.map(post => `/posts/${post.id}`)

      return ['/'].concat(routes)
    },
    exclude: [RegExp('/posts/23')]
  },
}
