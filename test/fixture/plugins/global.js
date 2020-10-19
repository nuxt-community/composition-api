import {
  onGlobalSetup,
  provide,
  ref,
  ssrRef,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'

export const ranSsr = ssrRef(0)
export const ran = ref(0)
export const ranFetch = ssrRef(0)

export default () => {
  ran.value = 0
  ranFetch.value = 0
  if (process.server) ranSsr.value = 0

  onGlobalSetup(() => {
    const { $config } = useContext()
    useFetch(async () => {
      ranFetch.value++
    })

    ran.value++
    if (process.server) ranSsr.value++

    provide('globalKey', true)
    provide('globalContext', $config)

    return {
      ran,
      ranSsr,
      ranFetch,
    }
  })
}
