<template>
  <div>
    <h1>Blog posts</h1>
    <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="20" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <p>Error while fetching posts: {{ $fetchState.error.message }}</p>
    </template>
    <template v-else>
      <ul>
        <li v-for="post of posts" :key="post.id">
          <n-link :to="`/posts/${post.id}`">
            {{ post.title }}
          </n-link>
        </li>
        <li>
          <n-link to="/posts/404">
            404 post
          </n-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
  useFetch,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

/** @typedef {{ userId: number, id: number, title: string, body: string }} Post */

export default defineComponent({
  setup() {
    const posts = ref(/** @type {Post[]} */([]))

    const { $http } = useContext()

    useFetch(async () => {
      /** @type {Post[]} */
      const data = await $http.$get('https://jsonplaceholder.typicode.com/posts')
      posts.value = data.slice(0, 20)
    })

    return { posts }
  },
})
</script>
