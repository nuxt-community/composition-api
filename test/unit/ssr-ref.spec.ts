/**
 * @jest-environment jsdom
 */

jest.setTimeout(60000)

/* eslint-disable @typescript-eslint/no-var-requires */
const { setup, get } = require('@nuxtjs/module-test-utils')
const config = require('../fixture/nuxt.config')
/* eslint-enable */

let nuxt

describe('SSR Refs', () => {
  beforeAll(async () => {
    nuxt = (await setup(config)).nuxt
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('__NUXT__ contains correct data', async () => {
    const html = await get('/ssr-ref')
    expect(html).toContain('"only SSR rendered"')
    expect(html).toContain('"runs SSR or client-side"')
  })
})
