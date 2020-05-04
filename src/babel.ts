import * as types from '@babel/types'
import { Visitor } from '@babel/traverse'
import crypto from 'crypto'

export default function ssrRefPlugin({ types: t }: { types: typeof types }) {
  const visitor: Visitor = {
    CallExpression(path) {
      if (!('name' in path.node.callee) || path.node.callee.name !== 'ssrRef')
        return

      if (path.node.arguments.length > 1) return
      const hash = crypto.createHash('md5')

      hash.update(String(path.node.callee.start))
      const digest = hash.digest('base64').toString()
      path.node.arguments.push(t.stringLiteral(digest))
    },
  }
  return { visitor }
}
