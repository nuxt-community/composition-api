import { expectType } from 'tsd'
import { Context } from '@nuxt/types'

import { withContext } from '../..'

// eslint-disable-next-line
expectType<void>(withContext(() => {}))

withContext(ctx => {
  expectType<Context>(ctx)
})
