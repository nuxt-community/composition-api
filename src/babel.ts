import * as types from '@babel/types'
import { Visitor } from '@babel/traverse'
import crypto from 'crypto'

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
      if (
        !('name' in path.node.callee) ||
        ['ssrRef', 'useAsync'].includes(path.node.callee.name)
      )
        return

      if (path.node.arguments.length > 1) return
      const hash = crypto.createHash('md5')

      hash.update(`${cwd}-${path.node.callee.start}`)
      const digest = hash.digest('base64').toString()
      path.node.arguments.push(t.stringLiteral(`${varName}${digest}`))
    },
  }
  return { visitor }
}
