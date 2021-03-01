export function compositionApiPlugin() {
  return {
    name: 'composition-api',
    enforce: 'pre',
    transform(code: string) {
      code = code.replace(
        /@nuxtjs[\\/]composition-api/g,
        '@nuxtjs/vite-composition-api'
      )
      return {
        code,
        map: null,
      }
    },
  }
}
