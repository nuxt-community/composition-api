<template>
  <blockquote>
    <p>
      <code>path: {{ route.path }}</code>
    </p>
    <p>
      <code>watch function called: {{ called }}</code>
    </p>
    <p>
      <code>route query test: {{ query.test }}</code>
    </p>
    <p>
      <code>route param slug: {{ params.slug }}</code>
    </p>
    <ul>
      <li>
        <nuxt-link :to="{ query: { test: true } }">
          Link with query
        </nuxt-link>
      </li>
    </ul>
  </blockquote>
</template>

<script>
import { defineComponent, useContext, ref, watch } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const { route, query, params } = useContext()
    const called = ref(0)
    watch(route, () => {
      called.value++
    })

    return { route, query, params, called }
  },
})
</script>
