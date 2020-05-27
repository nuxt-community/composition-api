import { Selector } from 'testcafe'
import { navigateTo, expectOnPage } from './helpers'

// eslint-disable-next-line
fixture`useMeta`

test('Shows correct title on server-loaded page', async t => {
  await navigateTo('/meta')
  await t.expect(Selector('title').innerText).eql('newSetTitle')
  await expectOnPage('title-newSetTitle')
  await t.expect(Selector('title').innerText).eql('mounted title')
  await expectOnPage('title-mounted title')
  await t.expect(Selector('body').getAttribute('class')).eql('dark-mode mobile')

  await t.click(Selector('a').withText('back'))
  await t.expect(Selector('title').innerText).eql('My fixture')
})

test('Shows correct title on client-loaded page', async t => {
  await navigateTo('/')
  await t.expect(Selector('title').innerText).eql('My fixture')

  await t.click(Selector('a').withText('meta'))
  await t.expect(Selector('title').innerText).eql('newSetTitle')
  await t.expect(Selector('title').innerText).eql('mounted title')
})
