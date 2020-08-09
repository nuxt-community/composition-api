import { onGlobalSetup, provide, ref, ssrRef } from '@nuxtjs/composition-api'

export const ranSsr = ssrRef(false)
export const ran = ref(false)

export default () => {
  onGlobalSetup(() => {
    ran.value = true
    ranSsr.value = true

    provide('globalKey', true)

    return {
      ran,
      ranSsr,
    }
  })
}
