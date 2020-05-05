import { Ref, reactive, toRefs, watchEffect } from '@vue/composition-api'

/**
 * DATA passed to window.__NUXT.__DATA__
 */
const data = reactive<any>({})



let ssrContext: any

function injectNamespace() {
  // Vue3: ssrContext.nuxt.__DATA__ = toRaw(data)
  // TODO: check if this is OK or not. I think it is not! We need a function like toRaw!
  ssrContext.nuxt.__DATA__ = JSON.parse(JSON.stringify(data))
}

let injected = false
export function setSSRContext(context: any) {
  ssrContext = ssrContext || context

  if (!injected && ssrContext) {
    injected = true
    if (process.server) {
      // TODO: optimize?
      watchEffect(injectNamespace)
    }
  }
}


/**
 * creates a new Namespace to sync data betwen client and server
 * @param rootKey internal name
 */
export function ssrNamespace(rootKey: string) {
  if (data[rootKey]) {
    throw 'Root key must be unique!'
  }

  return function <T>(key: string) {
    return {
      clientGet(value: T) {
        ;(window as any).__NUXT__?.__DATA__?.[rootKey]?.[key] ?? value
      },
      serverSet(value: T) {
        if (!data[rootKey]) {
          data[rootKey] = {}
        }
        data[rootKey][key] = value
      },
      serverCreateRef(value: T): Ref<T> {
        this.serverSet(value)

        // Vue3: toRef(data[rootKey], key)
        return toRefs(data[rootKey])[key] as Ref<T>
      },
    }
  }
}

/**
 * Namespace for uses in APP
 */
export const ssrAppNamespace = ssrNamespace('app')
