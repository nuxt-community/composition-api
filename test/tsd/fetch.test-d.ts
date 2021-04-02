import { expectType } from 'tsd'

import { useFetch } from 'src'

expectType<{
  fetch: () => void
  $fetch: () => void
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
