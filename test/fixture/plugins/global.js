import {
  onGlobalSetup,
  useMeta,
  provide,
  ref,
  ssrRef,
  useContext,
} from '@nuxtjs/composition-api'

export const ranSsr = ssrRef(0)
export const ran = ref(0)

export default () => {
  ran.value = 0
  if (process.server) ranSsr.value = 0

  onGlobalSetup(() => {
    const { $config } = useContext()
    const a = ssrRef('test')
    a.value = 'another'

    const { title } = useMeta()
    title.value = 'My fixture'

    ran.value++
    if (process.server) ranSsr.value++

    provide('globalKey', true)
    provide('globalContext', $config)

    return {
      ran,
      ranSsr,
    }
  })
}
