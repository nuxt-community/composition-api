<template>
  <blockquote>
    <p>
      <code>global setup was {{ ranSsr ? 'run' : 'not run' }} on server</code>
      <br />
      <code>global setup was {{ ran ? 'run' : 'not run' }} on client</code>
      <br />
      <code>
        globally injected value was
        {{ globalInject ? 'received' : 'not received' }}
      </code>
    </p>
  </blockquote>
</template>

<script>
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { ran, ranSsr } from '../plugins/global'

export default defineComponent({
  setup() {
    const globalInject = inject('globalKey', false)
    return { globalInject, ran, ranSsr }
  },
})
</script>
