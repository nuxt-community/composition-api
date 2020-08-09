<template>
  <blockquote>
    <p>
      <code>static value: {{ post }}</code>
    </p>
    <nuxt-link :to="`/static/${Number($route.params.id || 0) + 1}`">
      Next post
    </nuxt-link>
  </blockquote>
</template>

<script>
import {
  defineComponent,
  computed,
  useStatic,
  useContext,
} from '@nuxtjs/composition-api'

import { fetcher } from '../../utils'

const port = process.env.PORT || 3000

export default defineComponent({
  setup() {
    const { params } = useContext()
    const id = computed(() => params.value.id)
    const post = useStatic(
      id =>
        process.server && process.static
          ? fetcher({ id })
          : fetch(
              (process.server ? `http://localhost:${port}` : '') +
                `/api/posts/${id}`
            )
              .then(m => m.json())
              .catch(e => console.log(e)),
      id,
      'posts'
    )

    return { post }
  },
})
</script>
