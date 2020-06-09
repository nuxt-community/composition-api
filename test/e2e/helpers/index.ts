import { t, Selector, ClientFunction, RequestLogger } from 'testcafe'

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
export function getLogger(
  filter?: Parameters<typeof RequestLogger>[0],
  options?: Parameters<typeof RequestLogger>[1]
) {
  const logger = RequestLogger(filter, options)

  async function waitForFirstRequest(
    condition: Parameters<RequestLogger['contains']>[0] = () => true
  ) {
    for (let i = 0; i < 50; i++) {
      await t.wait(100)
      if (await logger.contains(condition)) return
    }
  }

  async function expectToBeCalled() {
    await waitForFirstRequest()
    await t.expect(logger.requests.length).gte(1)
    return t
  }

  async function expectToBeCalledWith(
    condition: Parameters<RequestLogger['contains']>[0]
  ) {
    await waitForFirstRequest(condition)
    await t.expect(await logger.contains(condition)).ok()
    return t
  }

  return {
    logger,
    expectToBeCalled,
    expectToBeCalledWith,
  }
}