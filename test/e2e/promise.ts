import { Selector } from 'testcafe'
import { navigateTo, expectOnPage } from './helpers'

// eslint-disable-next-line
fixture`ssrPromise`

test('Shows data on ssr-loaded page', async t => {
  await navigateTo('/promise')
  await expectOnPage('promise-server')

  await t.click(Selector('a').withText('home'))
  await t.click(Selector('a').withText('promise'))
  await expectOnPage('promise-server')
})

test('Shows appropriate data on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('promise'))
  await expectOnPage('promise-client')
})
