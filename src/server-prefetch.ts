import { onServerPrefetch as onPrefetch } from '@vue/composition-api'
const prefetchFunctions: Array<() => any> = []
const prefetchFunctionsEnd: Array<() => any> = []

let hasServerPrefetch = false
function setupOnServerPrefetch() {
  if (!hasServerPrefetch) {
    hasServerPrefetch = true
    onPrefetch(async () => {
      for (let i = 0; i < prefetchFunctions.length; i++) {
        await prefetchFunctions[i]()
      }
      for (let i = 0; i < prefetchFunctionsEnd.length; i++) {
        await prefetchFunctionsEnd[i]()
      }
    })
  }
}

export function onServerPrefetch(cb: () => any) {
  prefetchFunctions.push(cb)
  setupOnServerPrefetch()
}

export function onServerPrefetchEnd(cb: () => any) {
  prefetchFunctionsEnd.push(cb)
  setupOnServerPrefetch()
}
