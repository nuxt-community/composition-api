import { Selector } from 'testcafe'
import { navigateTo, expectOnPage, expectPathnameToBe } from './helpers'

// eslint-disable-next-line
fixture`Wrappers`

test('Shows data on ssr-loaded page', async () => {
  await navigateTo('/wrappers')
  await expectOnPage('store: true')
  await expectOnPage('route: true')
  await expectOnPage('router: true')
})

test('Shows appropriate data on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('wrappers'))
  await expectPathnameToBe('/wrappers')
  await expectOnPage('store: true')
  await expectOnPage('route: true')
  await expectOnPage('router: true')
})
