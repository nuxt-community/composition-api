/**
 * @jest-environment jsdom
 */
import { ssrRef, globalPlugin } from '../../src/runtime/composables'
import * as cAPI from '@vue/composition-api'

describe('ssrRef reactivity', () => {
  let ssrContext: Record<string, any>

  beforeEach(async () => {
    process.server = true
    ssrContext = Object.assign({}, { nuxt: {} })
    ;(cAPI as any).getCurrentInstance = () => ({
      proxy: {
        $nuxt: {
          context: { ssrContext },
        },
      },
    })
    globalPlugin({ app: { context: { ssrContext } } } as any, null)
  })
  test('ssrRefs react to change in state', async () => {
    process.client = false
    const name = ssrRef('', 'name')
    ssrRef('', 'unchanged')
    name.value = 'full name'
    expect(ssrContext).toMatchSnapshot()
  })
  test('ssrRefs react to deep change in object state', async () => {
    process.client = false
    const obj = ssrRef({ deep: { object: { name: 'nothing' } } }, 'obj')
    obj.value.deep.object.name = 'full name'
    expect(ssrContext).toMatchSnapshot()
  })
  test('ssrRefs react to deep change in array state', async () => {
    process.client = false
    const obj = ssrRef({ deep: { object: [{ name: 'nothing' }] } }, 'obj')
    obj.value.deep.object[0].name = 'full name'
    expect(ssrContext).toMatchSnapshot()
  })

  test('ssrRefs within multiple requests', async () => {
    const concurrentRef = ssrRef(1, 'concurrentRef')

    // simulate the new request comes in
    globalPlugin(
      { app: { context: { ssrContext: { nuxt: {} } } } } as any,
      null
    )

    concurrentRef.value = 2

    expect(ssrContext).toMatchSnapshot()
  })

  test('ssrRefs react to constructors', async () => {
    const testMap = new Map()
    testMap.set('john', 'doe')

    const obj = ssrRef({ testMap }, 'obj')

    expect(obj).toMatchSnapshot()
  })
})
