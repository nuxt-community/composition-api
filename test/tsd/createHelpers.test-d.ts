import {
  defineNuxtPlugin,
  defineNuxtMiddleware,
} from '../../src/runtime/composables/defineHelpers'
import { expectType } from 'tsd'

defineNuxtPlugin((context, inject) => {
  const hello = (msg: string) => console.log(`Hello ${msg}!`)

  expectType<boolean>(context.isDev)

  inject('hello', hello)
})

defineNuxtMiddleware(({ store, redirect }) => {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
})
