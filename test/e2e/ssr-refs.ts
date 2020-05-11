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
  await expectOnPage('shallow-server')

  await t.click(Selector('a').withText('home'))
  await t.click(Selector('a').withText('ssr refs'))
  await expectOnPage('ref-only SSR rendered')
  await expectOnPage('shallow-client')
})

test('Shows appropriate data on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('ssr refs'))
  await expectPathnameToBe('/ssr-ref')
  await expectNotOnPage('ref-only SSR rendered')
  await expectOnPage('function-runs SSR or client-side')
  await expectOnPage('on: client')
  await expectOnPage('shallow-client')
})

test('Shows SSR data when an ssrRef is defined outside setup', async () => {
  await navigateTo('/no-setup')
  await expectOnPage('ssrRef-SSR overwritten')
  await expectOnPage('async-prefetched async')
})

test('Shows client-side only data when an ssrRef is defined outside setup', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('outside of setup'))
  await expectNotOnPage('ssrRef-SSR overwritten')
  await expectNotOnPage('async-prefetched async')
  await expectOnPage('ssrRef-default value')
  await expectOnPage('async-default async')
})
