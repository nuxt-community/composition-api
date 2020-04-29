jest.setTimeout(60000)

import { setup, get } from '@nuxtjs/module-test-utils'
import config from './fixture/nuxt.config'

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
