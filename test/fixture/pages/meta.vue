<template>
  <div>
    <div>title-{{ title }}</div>
    <nuxt-link to="/">link back</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, useMeta, computed } from 'nuxt-composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()

    title.value = 'oldSetTitle'

    const { title: newImport, bodyAttrs } = useMeta()
    newImport.value = 'newSetTitle'

    bodyAttrs.value.class = ['dark-mode', 'mobile']

    return { title }
  },
})
</script>
