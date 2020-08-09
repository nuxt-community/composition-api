<template>
  <div>
    <h1>Test fixture</h1>
    <Nuxt />
    <footer>
      <h2>Layout</h2>
      <p>
        <code>route: {{ route.path }}</code>
      </p>
      <p>
        <nuxt-link to="/">
          Link back home
        </nuxt-link>
      </p>
    </footer>
  </div>
</template>

<script>
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { route } = useContext()

    const { title } = useMeta()
    title.value = 'My fixture'

    return { route, title }
  },
})
</script>
