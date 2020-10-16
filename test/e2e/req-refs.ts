import { Selector } from 'testcafe'
import { navigateTo, expectOnPage, expectPathnameToBe } from './helpers'

// eslint-disable-next-line
fixture`reqRef`

test('Shows data on ssr-loaded page', async () => {
  await navigateTo('/req-ref')
  await expectOnPage('reqRefCounter: 1')
  await expectOnPage('reqSsrRefCounter: 1')
  await navigateTo('/req-ref')
  await expectOnPage('reqRefCounter: 1')
  await expectOnPage('reqSsrRefCounter: 1')
})

test('Shows appropriate data on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('req refs'))
  await expectPathnameToBe('/req-ref')
  await expectOnPage('reqRefCounter: 1')
  await expectOnPage('reqSsrRefCounter: 0')
})
