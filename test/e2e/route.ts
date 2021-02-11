import { t, Selector } from 'testcafe'
import { navigateTo, expectOnPage } from './helpers'

// eslint-disable-next-line
fixture`useRoute`

async function displaysRouteCorrectly() {
  await expectOnPage('path: /route/a')
  await expectOnPage('watch function called: 1')
  await t.click(Selector('a').withText('Link with query'))
  await expectOnPage('route query test: true')
  await expectOnPage('watch function called: 2')
  await expectOnPage('route param slug: a')
}

test('Shows correct route info on server-loaded page', async () => {
  await navigateTo('/route/a')
  await displaysRouteCorrectly()
})

test('Shows correct route info on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('route'))
  await displaysRouteCorrectly()
})
