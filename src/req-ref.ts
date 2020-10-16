import { ref, Ref } from '@vue/composition-api'

import { sanitise, ssrRef } from './ssr-ref'

export const reqRefs = new Set<() => void>()

export const reqRef = <T>(initialValue: T): Ref<T> => {
  const _ref = ref(initialValue)

  if (process.server) reqRefs.add(() => (_ref.value = initialValue as any))

  return _ref as Ref<T>
}

export const reqSsrRef = <T>(initialValue: T, key?: string) => {
  const _ref = ssrRef(initialValue, key)

  if (process.server)
    reqRefs.add(() => {
      _ref.value =
        initialValue instanceof Function
          ? sanitise(initialValue())
          : initialValue
    })

  return _ref
}
