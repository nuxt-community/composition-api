const fetch = require('node-fetch')
const serverlessEnvironment = !!process.env.NOW_BUILD

export default {
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
  buildModules: ['nuxt-composition-api'],
  generate: {
    interval: 2000,
    async routes() {
      const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(d => d.slice(0, 20))
      const routes = posts.map(post => `/posts/${post.id}`)

      return ['/'].concat(routes)
    },
  },
}
