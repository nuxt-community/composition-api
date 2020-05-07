import { expectType } from 'tsd'

import { ssrRef, Ref } from '../..'

// eslint-disable-next-line
expectType<Ref<number>>(ssrRef(() => 42))
expectType<Ref<string>>(ssrRef('thoughtless'))
interface Obj {
  name: string
}
expectType<Ref<Obj>>(ssrRef({ name: 'today' }))
