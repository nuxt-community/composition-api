import { t, Selector, ClientFunction } from 'testcafe'

const url = `http://localhost:3000`
export function navigateTo(path: string) {
  return t.navigateTo(`${url}${path}`)
}

export function expectOnPage(text: string) {
  const selector = Selector('*').withText(new RegExp(text, 'i'))
  return t.expect(selector.visible).ok(`${text} was not found on page`)
}

export function expectNotOnPage(text: string) {
  const selector = Selector('*').withText(new RegExp(text, 'i'))
  return t.expect(selector.exists).notOk(`${text} was found on page`)
}

export const getWindowPathname = ClientFunction(() => window.location.pathname)

export function expectPathnameToBe(pathname: string) {
  return t.expect(getWindowPathname()).eql(pathname)
}
