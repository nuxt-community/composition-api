<template>
  <blockquote>
    <p>
      <code>static value: {{ JSON.stringify(post) }}</code>
    </p>
    <nuxt-link :to="`/static/${Number($route.params.id || 0) + 1}`">
      Next post
    </nuxt-link>
  </blockquote>
</template>

<script setup>
import {
  defineComponent,
  computed,
  useStatic,
  useRoute,
} from '@nuxtjs/composition-api'

import { fetcher } from '../../utils'

const port = process.env.PORT || 3000

const route = useRoute()
const id = computed(() => route.value.params.id)
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
</script>
