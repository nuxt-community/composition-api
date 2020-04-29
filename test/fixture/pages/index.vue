<template>
  <div>
    <div>name-{{ name }}</div>
    <nuxt-link to="/other">link forward</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useFetch } from '../../..'

export function fetcher(result) {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(result)
    }, 100)
  })
}

export default defineComponent({
  setup() {
    const name = ref('')
    
    useFetch(async () => {
      name.value = await fetcher('Full Name')
    })

    return {
      name
    }
  }
})
</script>
