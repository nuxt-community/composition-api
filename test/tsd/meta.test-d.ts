import { expectType } from 'tsd'

import { useMeta, Ref } from '../..'

expectType<Ref<string>>(useMeta({ title: 'provided' }).title)
expectType<Ref<string | undefined>>(useMeta().title)
