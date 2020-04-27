jest.setTimeout(60000)

/* eslint-disable @typescript-eslint/no-var-requires */
const { setup, get } = require('@nuxtjs/module-test-utils')
const config = require('./fixture/nuxt.config')
/* eslint-enable */

let nuxt

describe('useFetch', () => {
  beforeAll(async () => {
    nuxt = (await setup(config)).nuxt
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })
  test('fetches on ssr', async () => {
    const html = await get('/')
    expect(html).toContain('name-Full Name')
  })
})
