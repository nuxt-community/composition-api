import { Ref, reactive, toRefs, watchEffect } from '@vue/composition-api'

/**
 * DATA passed to window.__NUXT.__DATA__
 */
let data: any = null

let ssrContext: any

function injectNamespace() {
  // Vue3: ssrContext.nuxt.__DATA__ = toRaw(data)
  ssrContext.nuxt.__DATA__ = JSON.parse(JSON.stringify(data))
}

let injected = false
export function setSSRContext(context: any) {
  ssrContext = ssrContext || context
}

/**
 * creates a new Namespace to sync data betwen client and server
 * @param rootKey internal name
 */
export function ssrNamespace(rootKey: string): SsrNamespace {
  if (!data) {
    data = reactive<any>({})
  }

  if (data[rootKey]) {
    throw 'Root key must be unique!'
  }

  return function <T>(key: string) {
    if (!injected && ssrContext && process.server) {
      injected = true
      // TODO: optimize?
      watchEffect(injectNamespace)
    }

    return {
      clientGet(value: T) {
        return (window as any).__NUXT__?.__DATA__?.[rootKey]?.[key] ?? value
      },
      serverSet(value: T) {
        if (!data[rootKey]) {
          data[rootKey] = {}
        }
        data[rootKey][key] = value
      },
      serverCreateRef(value: T): Ref<T> {
        this.serverSet(value as any)

        // Vue3: toRef(data[rootKey], key)
        return toRefs(data[rootKey])[key] as Ref<T>
      },
    }
  }
}

/**
 * Namespace for uses in APP
 */
let _ns: null | SsrNamespace = null
export const ssrAppNamespace = {
  get(): SsrNamespace {
    if (_ns) {
      return _ns
    } else {
      _ns = ssrNamespace('app')
      return _ns
    }
  },
}

export type SsrNamespace = <T>(
  key: string
) => {
  clientGet(value: T): T
  serverSet(value: T): void
  serverCreateRef(value: T): Ref<T>
}
