import { navigateTo, expectPathnameToBe } from './helpers'

// eslint-disable-next-line
fixture`Hooks`

test('Accesses Nuxt context within a plugin', async () => {
  await navigateTo('/?redirect=true')
  await expectPathnameToBe('/other')
})
