module.exports = {
  title: '🏗️ Nuxt Composition API',
  description: 'Composition API hooks for Nuxt',
  evergreen: true,
  dest: 'dist',
  themeConfig: {
    repo: 'nuxt-community/composition-api',
    editLinks: true,
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
            '/helpers/ssrRef',
            '/helpers/useAsync',
            '/helpers/useContext',
            '/helpers/useFetch',
            '/helpers/useHead',
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
