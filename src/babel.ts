import * as types from '@babel/types'
import crypto from 'crypto'

import type { Visitor } from '@babel/traverse'

interface Babel {
  types: typeof types
  loadOptions: () => Record<string, any>
  getEnv: () => string
}

export default function ssrRefPlugin({ loadOptions, getEnv, types: t }: Babel) {
  const env = getEnv()
  const cwd = env === 'test' ? '' : loadOptions().cwd

  let varName = ''
  const visitor: Visitor = {
    ...(env !== 'production'
      ? {
          VariableDeclarator(path) {
            varName = 'name' in path.node.id ? `${path.node.id.name}-` : ''
          },
        }
      : {}),
    CallExpression(path) {
      if (!('name' in path.node.callee)) return

      let method: crypto.Encoding = 'base64'

      switch (path.node.callee.name) {
        case 'useStatic':
          if (path.node.arguments.length > 2) return
          if (path.node.arguments.length === 2) path.node.arguments.push()
          method = 'hex'
          break

        case 'shallowSsrRef':
        case 'ssrPromise':
        case 'ssrRef':
        case 'reqSsrRef':
        case 'useAsync':
          if (path.node.arguments.length > 1) return
          break

        case 'getCompositionApiKey':
          if (path.node.arguments.length > 0) return
          break

        default:
          return
      }

      const hash = crypto.createHash('md5')
      hash.update(`${cwd}-${path.node.callee.start}`)
      const digest = hash.digest(method).toString()
      path.node.arguments.push(t.stringLiteral(`${varName}${digest}`))
    },
  }
  return { visitor }
}
