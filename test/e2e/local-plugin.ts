import { navigateTo, expectPathnameToBe } from './helpers'
import { Selector } from 'testcafe'

// eslint-disable-next-line
fixture`Hooks`

test('Accesses Nuxt context within a plugin', async () => {
  await navigateTo('/?redirect=true')
  await expectPathnameToBe('/other')
})

test('Runs hook in an async component', async t => {
  await navigateTo('/')
  await t.click(Selector('button').withText('Show async component'))
  await expectPathnameToBe('/other')
})
