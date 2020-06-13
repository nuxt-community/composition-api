<template>
  <blockquote>
    <p>
      <code>promise-{{ promise }}</code>
    </p>
  </blockquote>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  ref,
  ssrPromise,
} from 'nuxt-composition-api'

import { fetcher } from '../utils'

export default defineComponent({
  setup() {
    const _promise = ssrPromise(async () => fetcher(process.server ? 'server' : 'client'))
    const promise = ref('')
    
    onBeforeMount(async () => {
      promise.value = await _promise
    })

    return {
      promise,
    }
  },
})
</script>
