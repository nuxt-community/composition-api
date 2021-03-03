import crypto from 'crypto'

function createKey(
  source: string,
  method: crypto.BinaryToTextEncoding = 'base64'
) {
  const hash = crypto.createHash('md5')
  hash.update(source)
  return hash.digest(method).toString()
}

export function compositionApiPlugin() {
  return {
    name: 'nuxt:composition-api',
    enforce: 'pre',
    transform(code: string, id: string) {
      code = code.replace(
        /@nuxtjs[\\/]composition-api/g,
        '~@nuxtjs/composition-api/vite'
      )
      code = code.replace(
        /getCompositionApiKey\(\)/g,
        (_match, _p1, offset) => {
          const key = createKey(`${id}-${offset}`)
          return `"${key}"`
        }
      )
      return {
        code,
        map: null,
      }
    },
  }
}
