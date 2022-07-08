import { transform } from '@babel/core'
import { describe, it, expect } from 'vitest'

import plugin from '../../src/babel-plugin'

const example = `
const ref = ref(1)
const ref2 = ssrRef(2)
const ref3 = ssrRef(3, 'custom-key')
const ref4 = ssrRef(() => 4)

const async1 = useAsync(() => null)
const async2 = useAsync(() => null, 'key')

const stat = useStatic(() => 4, '2', 'post')
const stat2 = useStatic(() => 4, '2')
const stat3 = useStatic(() => 4)
`

describe('ssrRef babel plugin', () => {
  it('works', () => {
    const { code } = transform(example, { plugins: [plugin] })
    expect(code).toMatchSnapshot()
  })
})
