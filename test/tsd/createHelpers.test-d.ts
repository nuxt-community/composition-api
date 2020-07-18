import {
  defineNuxtPlugin,
  defineNuxtMiddleware,
  defineNuxtModule,
  defineNuxtServerMiddleware,
} from '../..'
import { expectType } from 'tsd'

defineNuxtPlugin((context, inject) => {
  const hello = (msg: string) => console.log(`Hello ${msg}!`)

  expectType<boolean>(context.isClient)

  inject('hello', hello)
})

defineNuxtModule<{
  option: string
}>(function (options) {
  expectType<string>(this.options.rootDir)

  this.addPlugin('filename')

  expectType<string>(options.option)
})

defineNuxtMiddleware(({ store, redirect }) => {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
})

defineNuxtServerMiddleware((req, res, next) => {
  expectType<string | undefined>(req.url)

  next()
})
