import { navigateTo, expectOnPage } from './helpers'

// eslint-disable-next-line
fixture`isComputed`

test('do not detect not computed values', async t => {
  await navigateTo('/computed')
  await expectOnPage('test1-no')
  await expectOnPage('test2-no')
  await expectOnPage('test3-no')
  await expectOnPage('test4-no')
  await expectOnPage('test5-no')
  await expectOnPage('test6-no')
})

test('detects computed with no setter', async t => {
  await navigateTo('/computed')
  await expectOnPage('test7-yes')
  await expectOnPage('test8-yes')
})

test('detects computed with setter', async t => {
  await navigateTo('/computed')
  await expectOnPage('test9-yes')
})
