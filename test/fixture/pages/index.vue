<template>
  <div>
    <div>name-{{ name }}</div>
    <div v-if="$fetchState.pending">
      loading email
    </div>
    <div>email-{{ email }}</div>
    <div>{{ computedProp }}</div>
    <div>{{ myFunction() }}</div>
    <nuxt-link to="/other">link forward</nuxt-link>
    <button @click="$fetch">Refetch</button>
    <child-comp />
    <async-component v-if="showAsync" />
    <button @click="showAsync = !showAsync">Show async component</button>
  </div>
</template>

<script>
import { defineComponent, ref, computed, useFetch } from 'nuxt-composition-api'
import ChildComp from '../components/comp.vue'

const AsyncComponent = () => import('../components/async-component.vue')

export function fetcher(result, time = 100) {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(result)
    }, time)
  })
}

export default defineComponent({
  components: {
    ChildComp,
    AsyncComponent,
  },
  setup() {
    const showAsync = ref(false)
    const name = ref('')
    const email = ref('')
    const computedProp = computed(() => 'computed')
    
    function myFunction() {
      return 'function result'
    }
    
    useFetch(async () => {
      name.value = await fetcher('Full Name')
      if(process.client) email.value = await fetcher('long@load.com', 2000)
    })

    return {
      name,
      showAsync,
      email,
      computedProp,
      myFunction,
    }
  }
})
</script>
