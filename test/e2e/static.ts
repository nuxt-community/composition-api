import { Selector } from 'testcafe'
import {
  navigateTo,
  expectOnPage,
  getLogger,
} from './helpers'

const apiLogger = getLogger(/posts/)

const url = (id: string | number) => process.env.GENERATE ? `http://localhost:3000/posts-${id}.json`  : `http://localhost:3000/api/posts/${id}`

// eslint-disable-next-line
fixture`useStatic`.beforeEach(async t => {
  await t.addRequestHooks(apiLogger.logger)
  apiLogger.logger.clear()}
)

test('Shows data on ssr-loaded page', async t => {
  await navigateTo('/static/1')
  await expectOnPage('"id": "1"')
  const count = await apiLogger.logger.count(Boolean)
  await t.expect(count).eql(0)

  await t.click(Selector('a').withText('home'))
  await t.click(Selector('a').withText('static'))
  await expectOnPage('"id": "1"')
  const newCount = await apiLogger.logger.count(Boolean)
  await t.expect(newCount).eql(count)
})

test('Shows data on non-generated page', async t => {
  await navigateTo('/static/3')
  apiLogger.logger.clear()
  await t.click(Selector('a').withText('Next'))
  const count = await apiLogger.logger.count(Boolean)
  await t.expect(count).eql(2)
})

test('Shows appropriate data on client-loaded page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('static'))
  await expectOnPage('"id": "1"')
  await t.expect(apiLogger.logger.count(Boolean)).eql(1)
  await apiLogger.expectToBeCalledWith(r => r.request.url === url(1))

  await t.click(Selector('a').withText('Next'))
  await expectOnPage('"id": "2"')
  await t.expect(apiLogger.logger.count(Boolean)).eql(2)
  await apiLogger.expectToBeCalledWith(r => r.request.url === url(2))
})