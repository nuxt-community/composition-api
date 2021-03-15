<template>
  <blockquote>
    <p>
      <code>store: {{ storeExists }}</code>
      <code>route: {{ routeExists }}</code>
      <code>router: {{ routerExists }}</code>
    </p>
  </blockquote>
</template>

<script>
import {
  defineComponent,
  useRoute,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      routeExists: !!useRoute(),
      routerExists: !!useRouter(),
      storeExists: !!useStore(),
    }
  },
})
</script>
