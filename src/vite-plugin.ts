import crypto from 'crypto'
import MagicString from 'magic-string'
import { walk } from 'estree-walker'
import type { Plugin } from 'rollup'

function createKey(
  source: string,
  method: crypto.BinaryToTextEncoding = 'base64'
) {
  const hash = crypto.createHash('md5')
  hash.update(source)
  return hash.digest(method).toString()
}

export function compositionApiPlugin(): Plugin & { enforce: 'pre' } {
  return {
    name: 'nuxt:composition-api',
    enforce: 'pre',
    transform(code: string, filename: string) {
      code = code.replace(
        /@nuxtjs[\\/]composition-api(?![\\/])/g,
        '~composition-api'
      )
      const keyedFunctions =
        /(useStatic|shallowSsrRef|ssrPromise|ssrRef|reqSsrRef|useAsync)/
      if (!keyedFunctions.test(code)) {
        return {
          code,
          map: null,
        }
      }

      try {
        const { 0: script = code, index: codeIndex = 0 } =
          code.match(/(?<=<script[^>]*>)[\S\s.]*?(?=<\/script>)/) || []
        const ast = this.parse(script)
        const s = new MagicString(code)

        walk(ast, {
          enter(node) {
            const { end } = node as unknown as {
              end: number
            }
            const { callee, arguments: args = [] } = node as {
              callee?: {
                type?: string
                name?: string
                property?: { type: string; name: string }
              }
              arguments?: any[]
            }
            if (
              callee?.type === 'Identifier' ||
              callee?.property?.type === 'Identifier'
            ) {
              let method: crypto.BinaryToTextEncoding = 'base64'

              switch (callee.name || callee.property?.name) {
                case 'useStatic':
                  if (args.length > 2) return
                  if (args.length === 2) {
                    s.prependLeft(codeIndex + end - 1, ', undefined')
                  }
                  method = 'hex'
                  break

                case 'shallowSsrRef':
                case 'ssrPromise':
                case 'ssrRef':
                case 'reqSsrRef':
                case 'useAsync':
                  if (args.length > 1) return
                  break

                default:
                  return
              }
              s.appendLeft(
                codeIndex + end - 1,
                ", '" + createKey(`${filename}-${end}`, method) + "'"
              )
            }
          },
        })

        return {
          code: s.toString(),
          map: s.generateMap({ source: filename }).toString(),
        }
      } catch {}
    },
  }
}
