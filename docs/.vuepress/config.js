module.exports = {
  title: '🏗️ Nuxt Composition API',
  description: 'Composition API hooks for Nuxt',
  evergreen: true,
  dest: 'dist',
  themeConfig: {
    editLinks: true,
    repo: 'nuxt-community/composition-api',
    docsDir: 'docs',
    sidebar: {
      '/': [
        {
          title: 'Setup',
          collapsable: false,
          children: ['/', '/setup'],
        },
        {
          title: 'Helpers',
          collapsable: false,
          children: [
            '/helpers/onGlobalSetup',
            '/helpers/shallowSsrRef',
            '/helpers/ssrPromise',
            '/helpers/ssrRef',
            '/helpers/useAsync',
            '/helpers/useContext',
            '/helpers/useFetch',
            '/helpers/useMeta',
            '/helpers/useStatic',
            '/helpers/definitionHelpers',
          ],
        },
        {
          title: 'Examples',
          collapsable: false,
          children: ['/examples/useFetch', '/examples/live'],
        },
      ],
    },
  },
}
