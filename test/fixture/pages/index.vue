<template>
  <main>
    <h2>
      useFetch tests
    </h2>
    <p>
      <button @click="$fetch">Refetch</button>
    </p>
    <blockquote>
      <p>
        <code>name-{{ name }}</code>
      </p>
      <p>
        <code>
          email-{{ email }}
          <br />
          <span v-if="$fetchState.pending">
            loading email
          </span>
        </code>
      </p>
      <p>
        <code>
          {{ computedProp }}
        </code>
      </p>
      <p>
        <code>
          {{ myFunction() }}
        </code>
      </p>
      <child-comp />
    </blockquote>
    <h2>Links</h2>
    <ul>
      <li><nuxt-link to="/other">link forward</nuxt-link></li>
      <li><nuxt-link to="/ssr-ref">ssr refs</nuxt-link></li>
      <li><nuxt-link to="/promise">promise</nuxt-link></li>
      <li><nuxt-link to="/context/a">context</nuxt-link></li>
      <li><nuxt-link to="/hooks">hooks</nuxt-link></li>
      <li><nuxt-link to="/static/1">static</nuxt-link></li>
      <li>
        <nuxt-link to="/no-setup">ssr ref defined outside of setup</nuxt-link>
      </li>
      <li><nuxt-link to="/meta">meta</nuxt-link></li>
    </ul>
  </main>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useFetch,
} from '@nuxtjs/composition-api'
import ChildComp from '../components/comp.vue'

import { fetcher } from '../utils'

export default defineComponent({
  components: {
    ChildComp,
  },
  setup() {
    const name = ref('')
    const email = ref('')
    const computedProp = computed(() => 'computed')

    function myFunction() {
      return 'function result'
    }

    useFetch(async () => {
      name.value = await fetcher('Full Name')
      if (process.client) email.value = await fetcher('long@load.com', 2000)
    })

    return {
      name,
      email,
      computedProp,
      myFunction,
    }
  },
})
</script>
