<template>
  <div />
</template>

<script>
import { defineComponent, useAsyncPlugin } from 'nuxt-composition-api'

useAsyncPlugin(({ route, redirect }) => {
  console.log('loaded plugin from unused page')
})

export default defineComponent({})
</script>
