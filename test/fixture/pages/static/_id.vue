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
} from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const { params } = useContext()
    const id = computed(() => params.value.id)
    const post = useStatic(
      id =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(m =>
          m.json()
        ),
      id,
      'posts'
    )

    return { post }
  },
})
</script>
