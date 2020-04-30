import { t, Selector, ClientFunction } from 'testcafe'

function expectOnPage(text: string) {
  const selector = Selector('*').withText(new RegExp(text, 'i'))
  return t.expect(selector.visible).ok()
}

const getWindowPathname = ClientFunction(() => window.location.pathname)

function expectPathnameToBe(pathname: string) {
  return t.expect(getWindowPathname()).eql(pathname)
}

// eslint-disable-next-line
fixture`Fetch`

test('Shows fetched data on page', async t => {
  await t.navigateTo(`http://localhost:3000/`)
  await expectOnPage('name-Full Name')
})

test('Shows fetched data on page', async t => {
  await t.navigateTo(`http://localhost:3000/other/`)
  await t.click(Selector('a'))
  await expectPathnameToBe('/')
  await expectOnPage('name-Full Name')
})
