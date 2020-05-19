<template>
  <div>
    <h1>Test fixture</h1>
    <Nuxt />
    <footer>
      <p>
        <nuxt-link to="/">
          Link back home
        </nuxt-link>
      </p>
    </footer>
  </div>
</template>

<script>
import { defineComponent, useContext } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const { route } = useContext()
  },
})
</script>
