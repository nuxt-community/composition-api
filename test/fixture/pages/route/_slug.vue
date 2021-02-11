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
        <nuxt-link :to="{ query: { test: true } }"> Link with query </nuxt-link>
      </li>
    </ul>
  </blockquote>
</template>

<script>
import {
  computed,
  defineComponent,
  useRoute,
  ref,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const route = useRoute()
    const query = computed(() => route.value.query)
    const params = computed(() => route.value.params)
    const called = ref(0)
    watch(
      route,
      () => {
        called.value++
      },
      { immediate: true }
    )

    return { route, query, params, called }
  },
})
</script>
