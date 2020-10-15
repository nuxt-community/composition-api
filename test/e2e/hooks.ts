import { Selector } from 'testcafe'
import { navigateTo, expectOnPage } from './helpers'

// eslint-disable-next-line
fixture`onGlobalSetup`

const assertions = async () => {
  await expectOnPage('global setup was run 1 times on server')
  await expectOnPage('global setup was run 1 times on client')
  await expectOnPage('globally injected value was received')
}

test('Runs plugin on server side page', async () => {
  await navigateTo('/hooks')
  await assertions()

  await navigateTo('/hooks')
  await assertions()
})

test('Runs plugin on client rendered page', async t => {
  await navigateTo('/')
  await t.click(Selector('a').withText('hooks'))
  await assertions()
})
