import { onGlobalSetup, provide, ref, ssrRef } from '@nuxtjs/composition-api'

export const ranSsr = ssrRef(0)
export const ran = ref(0)

export default () => {
  ran.value = 0
  if (process.server) ranSsr.value = 0

  onGlobalSetup(() => {
    ran.value++
    if (process.server) ranSsr.value++

    provide('globalKey', true)

    return {
      ran,
      ranSsr,
    }
  })
}
