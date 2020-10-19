<template>
  <blockquote>
    <p>
      <code>
        global setup was {{ ranSsr ? 'run' : 'not run' }} {{ ranSsr }} times on
        server
      </code>
      <br />
      <code>
        global setup was {{ ran ? 'run' : 'not run' }} {{ ran }} times on client
      </code>
      <br />
      <code>
        globally injected value was
        {{ globalInject ? 'received' : 'not received' }}
      </code>
      <br />
      <code>
        globally injected config from context was
        {{ globalConfig.globalInject }}
      </code>
      <br />
      <code>
        global fetch was {{ ranFetch ? 'run' : 'not run' }} {{ ranFetch }} times
        on server
      </code>
    </p>
  </blockquote>
</template>

<script>
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { ran, ranSsr, ranFetch } from '../plugins/global'

export default defineComponent({
  setup() {
    const globalInject = inject('globalKey', false)
    const globalConfig = inject('globalContext', {})

    return { globalInject, ran, ranSsr, ranFetch, globalConfig }
  },
})
</script>
