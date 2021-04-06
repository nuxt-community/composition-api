import { expectType } from 'tsd'

import { useMeta, Ref } from '../..'

expectType<Ref<string>>(useMeta({ title: 'provided' }).title)
expectType<Ref<undefined | string | ((title: string) => string)>>(
  useMeta().titleTemplate
)
expectType<Ref<string | undefined>>(useMeta().title)
