import { t,Selector } from 'testcafe'
import { navigateTo, expectOnPage } from './helpers'

// eslint-disable-next-line
fixture`useContext`

async function displaysContextCorrectly() {
  await expectOnPage('path: /context/a')
  await expectOnPage('watch function called: 1')
  await t.click(Selector('a').withText('Link with query'))
  await expectOnPage('route query test: true')
  await expectOnPage('watch function called: 2')
  await expectOnPage('route param slug: a')
}

test('Shows correct context info on server-loaded page', async () => {
  await navigateTo('/context/a')
  await displaysContextCorrectly()
})

test('Shows correct context info on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('context'))
  await displaysContextCorrectly()
})