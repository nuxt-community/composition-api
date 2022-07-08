/**
 * @jest-environment happy-dom
 */
import { describe, beforeEach, test, expect, vi } from 'vitest'
import { ssrRef, globalPlugin } from '../../src/runtime/composables'

let ssrContext: Record<string, any>

vi.mock('../../src/runtime/composables/utils', async () => {
  const utils = await vi.importActual('../../src/runtime/composables/utils')
  return {
    ...utils,
    getCurrentInstance: vi.fn().mockImplementation(() => ({
      $nuxt: {
        context: { ssrContext },
      },
    })),
  }
})

describe('ssrRef reactivity', () => {
  beforeEach(async () => {
    process.server = true
    ssrContext = Object.assign({}, { nuxt: {} })
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
