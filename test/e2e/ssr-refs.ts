import { Selector } from 'testcafe'
import {
  navigateTo,
  expectOnPage,
  expectPathnameToBe,
  expectNotOnPage,
} from './helpers'

// eslint-disable-next-line
fixture`ssrRef`

test('Shows data on ssr-loaded page', async t => {
  await navigateTo('/ssr-ref')
  await expectOnPage('ref-only SSR rendered')
  await expectOnPage('function-runs SSR or client-side')
  await expectOnPage('prefetched-result')
  await expectOnPage('on: server')

  await t.click(Selector('a').withText('home'))
  await t.click(Selector('a').withText('ssr refs'))
  await expectOnPage('ref-only SSR rendered')
})

test('Shows appropriate data on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('ssr refs'))
  await expectPathnameToBe('/ssr-ref')
  await expectNotOnPage('ref-only SSR rendered')
  await expectOnPage('function-runs SSR or client-side')
  await expectOnPage('on: client')
})
