import { ref, Ref, reactive, toRefs, watchEffect } from '@vue/composition-api'

let ssrContext: any
let injected = false
let ctxSet = ref(false)

const data = reactive<any>({})

function injectNamespace() {
  if (ctxSet.value) {
    ssrContext.nuxt.__DATA__ = JSON.parse(JSON.stringify(data))
  }
}
export function setSSRContext(context: any) {
  ssrContext = ssrContext || context

  if (!injected && ssrContext) {
    injected = true
    if (process.server) {
      // TODO: optimize?
      watchEffect(injectNamespace)
    }
  }

  ctxSet.value = true
}

export function ssrNamespace(rootKey: string) {
  if (data[rootKey]) {
    throw 'Root key must be unique!'
  }

  data[rootKey] = {}

  return function <T>(key: string) {
    return {
      clientGet(value: T) {
        ;(window as any).__NUXT__?.__DATA__?.[rootKey]?.[key] ?? value
      },
      serverSet(value: T) {
        data[rootKey][key] = value
      },
      createRef(value: T): Ref<T> {
        data[rootKey][key] = value

        // TODO: use toRef(data[rootKey], key)
        return toRefs(data[rootKey])[key] as Ref<T>
      },
    }
  }
}
