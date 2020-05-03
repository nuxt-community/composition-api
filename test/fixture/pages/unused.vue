<template>
  <div />
</template>

<script>
import { defineComponent, useLocalPlugin } from 'nuxt-composition-api'

useLocalPlugin(({ route, redirect }) => {
  console.log('loaded plugin from unused page')
})

export default defineComponent({})
</script>
