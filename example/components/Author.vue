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
  useContext,
  ref,
} from '@nuxtjs/composition-api'

/** @typedef {{ name: number }} User */

export default defineComponent({
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const user = ref(/** @type {User} */({}))

    const { $http } = useContext()

    useFetch(async () => {
      user.value = await $http.$get(
        `https://jsonplaceholder.typicode.com/users/${props.userId}`
      )
    })

    return { user }
  },
  fetchOnServer: false,
})
</script>
