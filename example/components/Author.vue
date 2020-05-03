<template>
  <p v-if="$fetchState.error">
    Could not fetch Author
  </p>
  <p v-else>
    Written by {{ $fetchState.pending ? '...' : user.name }}
    <button @click="$fetch">
      Refresh
    </button>
  </p>
</template>

<script>
import {
  defineComponent,
  useFetch,
  withContext,
  ref,
} from 'nuxt-composition-api'

export default defineComponent({
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const user = ref({})

    withContext(({ $http }) => {
      useFetch(async () => {
        user.value = await $http.$get(
          `https://jsonplaceholder.typicode.com/users/${props.userId}`
        )
      })
    })

    return { user }
  },
  fetchOnServer: false,
})
</script>
