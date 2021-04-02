import { expectType } from 'tsd'

import { useAsync, Ref, ssrRef } from 'src'

expectType<Ref<null | { a: string }>>(useAsync(async () => ({ a: 'test' })))

expectType<Ref<null | { a: string }>>(
  useAsync(async () => ({ a: 'test' }), ssrRef(null))
)
