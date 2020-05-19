<template>
  <blockquote>
    <p>
      <code>ssrRef-{{ noSetup }}</code>
    </p>
    <p>
      <code>async-{{ async }}</code>
    </p>
  </blockquote>
</template>

<script>
import { defineComponent, ssrRef, onServerPrefetch } from 'nuxt-composition-api'

export function fetcher(result, time = 100) {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(result)
    }, time)
  })
}

const noSetup = ssrRef('default value')
const async = ssrRef('default async')
const unchanged = ssrRef('unchanged')

export default defineComponent({
  setup() {
    if (process.server) noSetup.value = 'SSR overwritten'

    onServerPrefetch(async () => {
      async.value = await fetcher('prefetched async', 400)
    })

    return {
      noSetup,
      async,
    }
  },
})
</script>
