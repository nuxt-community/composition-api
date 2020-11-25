import { Selector } from 'testcafe'
import { navigateTo, expectOnPage } from './helpers'

// eslint-disable-next-line
fixture`useMeta`

test('Shows correct title on server-loaded page', async t => {
  await navigateTo('/meta')
  await t.expect(Selector('title').innerText).eql('newSetTitle - fixture')
  await expectOnPage('title-newSetTitle')
  await t.expect(Selector('title').innerText).eql('mounted title - fixture')
  await expectOnPage('title-mounted title')
  await t.expect(Selector('body').getAttribute('class')).eql('dark-mode mobile')

  await t.click(Selector('button').withText('Change'))
  await t.expect(Selector('title').innerText).eql('mounted title - Changed')

  await t.click(Selector('button').withText('Set'))
  await t
    .expect(Selector('meta[name=message]').getAttribute('content'))
    .eql('new message')
  await t
    .expect(Selector('meta[name=viewport]').getAttribute('content'))
    .eql('width=device-width, initial-scale=1')
  await t.expect(Selector('noscript').textContent).eql('Test')

  await t.click(Selector('a').withText('back'))
  await t.expect(Selector('title').innerText).eql('My fixture - fixture')
})

test('Shows correct title on client-loaded page', async t => {
  await navigateTo('/')
  await t.expect(Selector('title').innerText).eql('My fixture - fixture')

  await t.click(Selector('a').withText('meta'))
  await t.expect(Selector('title').innerText).eql('newSetTitle - fixture')

  await t.expect(Selector('title').innerText).eql('mounted title - fixture')

  await t.click(Selector('button').withText('Change'))
  await t.expect(Selector('title').innerText).eql('mounted title - Changed')

  await t.click(Selector('button').withText('Set'))
  await t
    .expect(Selector('meta[name=message]').getAttribute('content'))
    .eql('new message')
  await t
    .expect(Selector('meta[name=viewport]').getAttribute('content'))
    .eql('width=device-width, initial-scale=1')
  await t.expect(Selector('noscript').textContent).eql('Test')
})
