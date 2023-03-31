<template>
  <div>
    <div>component-{{ prop }}</div>
  </div>
</template>

<script>
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'

/**
* @param {string} result
* @param {number} [time=100]
*/
export function fetcher(result, time = 100) {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(result)
    }, time)
  })
}

export default defineComponent({
  setup() {
    const prop = ref('')

    useFetch(async () => {
      prop.value = await fetcher('Component data')
    })

    return {
      prop,
    }
  },
})
</script>
