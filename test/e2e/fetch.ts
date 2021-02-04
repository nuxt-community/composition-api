import { Selector } from 'testcafe'
import {
  navigateTo,
  expectOnPage,
  expectPathnameToBe,
  expectNotOnPage,
} from './helpers'

// eslint-disable-next-line
fixture`useFetch`

test('Shows fetched data on ssr-loaded page', async t => {
  await navigateTo('/')
  await expectOnPage('name-Full Name')
  await expectOnPage('component-Component data')
})

test('Shows fetched data on client-loaded page', async t => {
  await navigateTo('/other')
  await t.click(Selector('a'))
  await expectPathnameToBe('/')
  await expectOnPage('name-Full Name')
  await expectOnPage('component-Component data')
})

test('Shows loading state', async t => {
  await navigateTo('/other')
  await t.click(Selector('a'))
  await expectPathnameToBe('/')
  await expectOnPage('loading email')
  await t.wait(4000)
  await expectOnPage('long@load.com')
  await expectNotOnPage('loading email')
})

test('Refetches with $fetch', async t => {
  await navigateTo('/')
  await expectNotOnPage('loading email')
  await t.click(Selector('button'))
  await expectOnPage('loading email')
})

test('TTFB is lower than 100ms', async t => {
  await navigateTo('/')
  const ttfbRegex = /TTFB: (\d+)ms/
  const selector = await Selector('*').withText(new RegExp(ttfbRegex, 'i'))
  const text = await selector.innerText
  const [, msString] = /TTFB: (\d+)ms/.exec(text)!
  const ms = Number(msString)
  await t.expect(ms).lte(100)
})

test("Doesn't overwrite methods and getters", async () => {
  await navigateTo('/')
  await expectOnPage('computed')
  await expectOnPage('function result')
})
