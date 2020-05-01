import { t, Selector, ClientFunction } from 'testcafe'

const url = `http://localhost:3000`

function expectOnPage(text: string) {
  const selector = Selector('*').withText(new RegExp(text, 'i'))
  return t.expect(selector.visible).ok()
}

function expectNotOnPage(text: string) {
  const selector = Selector('*').withText(new RegExp(text, 'i'))
  return t.expect(selector.exists).notOk()
}

const getWindowPathname = ClientFunction(() => window.location.pathname)

function expectPathnameToBe(pathname: string) {
  return t.expect(getWindowPathname()).eql(pathname)
}

// eslint-disable-next-line
fixture`Fetch`

test('Shows fetched data on ssr-loaded page', async t => {
  await t.navigateTo(`${url}/`)
  await expectOnPage('name-Full Name')
  await expectOnPage('component-Component data')
})

test('Shows fetched data on client-loaded page', async t => {
  await t.navigateTo(`${url}/other/`)
  await t.click(Selector('a'))
  await expectPathnameToBe('/')
  await expectOnPage('name-Full Name')
  await expectOnPage('component-Component data')
})

test('Shows loading state', async t => {
  await t.navigateTo(`${url}/other/`)
  await t.click(Selector('a'))
  await expectPathnameToBe('/')
  await expectOnPage('loading email')
  await t.wait(4000)
  await expectOnPage('long@load.com')
  await expectNotOnPage('loading email')
})

test('Refetches with $fetch', async t => {
  await t.navigateTo(`${url}/`)
  await expectNotOnPage('loading email')
  await t.click(Selector('button'))
  await expectOnPage('loading email')
})

test("Doesn't overwrite methods and getters", async t => {
  await t.navigateTo(`${url}/`)
  await expectOnPage('computed')
  await expectOnPage('function result')
})
