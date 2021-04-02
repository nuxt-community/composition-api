import { expectType } from 'tsd'

import { ssrRef, Ref, shallowSsrRef } from 'src'

expectType<Ref<number>>(ssrRef(() => 42))
expectType<Ref<string>>(ssrRef('thoughtless'))
interface Obj {
  name: string
}
expectType<Ref<Obj>>(ssrRef({ name: 'today' }))
expectType<Ref<null>>(ssrRef(null))

expectType<Ref<number>>(shallowSsrRef(() => 42))
expectType<Ref<string>>(shallowSsrRef('thoughtless'))
expectType<Ref<Obj>>(shallowSsrRef({ name: 'today' }))
expectType<Ref<null>>(shallowSsrRef(null))
