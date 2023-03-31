import { expectType } from 'tsd'

import { useFetch } from '../..'

expectType<{
  fetch: () => void | Promise<void>
  $fetch: () => void | Promise<void>
  fetchState: {
    error: Error | null
    pending: boolean
    timestamp: number
  }
  $fetchState: {
    error: Error | null
    pending: boolean
    timestamp: number
  }
}>(
  useFetch(async () => {
    //
  })
)
