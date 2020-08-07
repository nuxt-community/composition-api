<template>
  <blockquote>
    <p>
      <code>title-{{ title }}</code>
    </p>
  </blockquote>
</template>

<script>
import {
  defineComponent,
  useMeta,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup() {
    const { title } = useMeta()

    title.value = 'oldSetTitle'

    const { title: newImport, bodyAttrs } = useMeta()
    newImport.value = 'newSetTitle'

    onMounted(() => {
      setTimeout(() => {
        title.value = 'mounted title'
      }, 1000)
    })

    bodyAttrs.value.class = ['dark-mode', 'mobile']

    return { title }
  },
})
</script>
