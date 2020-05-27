import { Selector } from 'testcafe'
import {
  navigateTo,
  expectOnPage,
  getLogger,
} from './helpers'

const apiLogger = getLogger(/json/)

const url = (id: string | number) => process.env.GENERATE ? `http://localhost:3000/posts-${id}.json`  : `https://jsonplaceholder.typicode.com/posts/${id}`

// eslint-disable-next-line
fixture`useStatic`.beforeEach(async t => {
  await t.addRequestHooks(apiLogger.logger)
  apiLogger.logger.clear()}
)

test('Shows data on ssr-loaded page', async t => {
  await navigateTo('/static/1')
  await expectOnPage('"id": 1')
  const count = await apiLogger.logger.count(Boolean)
  // TODO: remove once #44 is resolved
  if (!process.env.GENERATE) await t.expect(count).eql(0)

  await t.click(Selector('a').withText('home'))
  await t.click(Selector('a').withText('static'))
  await expectOnPage('"id": 1')
  const newCount = await apiLogger.logger.count(Boolean)
  await t.expect(newCount).eql(count)
})

test('Shows appropriate data on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('static'))
  await t.wait(500)
  await expectOnPage('"id": 1')
  await t.expect(apiLogger.logger.count(Boolean)).eql(1)
  await apiLogger.expectToBeCalledWith(r => r.request.url === url(1))

  await t.click(Selector('a').withText('Next'))
  await t.wait(500)
  await expectOnPage('"id": 2')
  await t.expect(apiLogger.logger.count(Boolean)).eql(2)
  await apiLogger.expectToBeCalledWith(r => r.request.url === url(2))
})