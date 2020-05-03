<template>
  <div />
</template>

<script>
import { defineComponent, useLocalPlugin } from 'nuxt-composition-api'

useLocalPlugin(({ route, redirect }) => {
    redirect(301, '/other')
})

export default defineComponent({})
</script>
