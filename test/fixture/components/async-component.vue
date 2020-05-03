<template>
  <div />
</template>

<script>
import { defineComponent, useAsyncPlugin } from 'nuxt-composition-api'

useAsyncPlugin(({ route, redirect }) => {
  redirect(301, '/other')
})

export default defineComponent({})
</script>
