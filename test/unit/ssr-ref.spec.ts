/**
 * @jest-environment jsdom
 */

jest.setTimeout(60000)

/* eslint-disable @typescript-eslint/no-var-requires */
const { setup, get } = require('@nuxtjs/module-test-utils')
const config = require('../fixture/nuxt.config')
/* eslint-enable */

let nuxt

describe('ssrRef', () => {
  beforeAll(async () => {
    nuxt = (await setup(config)).nuxt
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('__NUXT__ contains correct data', async () => {
    const homePage = await get('/')
    expect(homePage.includes('"only SSR rendered"')).toBeFalsy()
    expect(homePage.includes('"runs SSR or client-side"')).toBeFalsy()

    const ssrRefPage = await get('/ssr-ref')
    expect(ssrRefPage).toContain('"only SSR rendered"')
    expect(ssrRefPage).toContain('"runs SSR or client-side"')

    const rerenderedHomePage = await get('/')
    expect(rerenderedHomePage.includes('"only SSR rendered"')).toBeFalsy()
    expect(rerenderedHomePage.includes('"runs SSR or client-side"')).toBeFalsy()
  })
})
