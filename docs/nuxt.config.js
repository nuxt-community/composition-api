import theme from '@nuxt/content-theme-docs'

export default theme({
  generate: {
    routes: ['/'],
    exclude: ['/example', '/fixture']
  },
})