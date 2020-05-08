import { Selector } from 'testcafe'
import { navigateTo } from './helpers'

// eslint-disable-next-line
fixture`useMeta`

test('Shows correct title on server-loaded page', async t => {
  await navigateTo('/meta')
  await t.expect(Selector('title').innerText).eql('newSetTitle')
  await t.click(Selector('a').withText('back'))
  await t.expect(Selector('title').innerText).eql('My fixture')
})

test('Shows correct title on client-loaded page', async t => {
  await navigateTo('/')
  await t.expect(Selector('title').innerText).eql('My fixture')
  await t.click(Selector('a').withText('meta'))
  await t.expect(Selector('title').innerText).eql('newSetTitle')
})
