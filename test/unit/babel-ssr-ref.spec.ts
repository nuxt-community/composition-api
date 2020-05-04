/* eslint-disable @typescript-eslint/no-var-requires */
const babel = require('@babel/core')
const plugin = require('../../lib/babel')
/* eslint-enable */

var example = `
const ref = ref(1)
const ref2 = ssrRef(2)
const ref3 = ssrRef(3, 'custom-key')
const ref4 = ssrRef(4)
`

describe('babel plugin', () => {
  it('works', () => {
    const { code } = babel.transform(example, { plugins: [plugin] })!
    expect(code).toMatchSnapshot()
  })
})
