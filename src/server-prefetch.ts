import {
  onServerPrefetch as onPrefetch,
  getCurrentInstance,
} from '@vue/composition-api'
import { ComponentInstance } from '@vue/composition-api/dist/component'

const ssrRefFunctions = new WeakMap<ComponentInstance, (() => void)[]>()
const isPending = new WeakMap<ComponentInstance, number>()

export function onServerPrefetch(cb: () => any) {
  const vm = getCurrentInstance()

  if (!vm) throw new Error('ssrRef must be called within setup()')

  const pending = isPending.get(vm) || 0

  isPending.set(vm, pending + 1)

  onPrefetch(async () => {
    await cb()

    const pending = isPending.get(vm) || 0

    if (pending <= 1) {
      const fn = ssrRefFunctions.get(vm) || []
      await Promise.all(fn.map(p => p()))
    } else {
      isPending.set(vm, pending - 1)
    }
  })
}

export function onFinalServerPrefetch(cb: () => any) {
  if (!process.server) return

  const vm = getCurrentInstance()

  if (!vm)
    throw new Error('onFinalServerPrefetch must be called within setup()')

  const fn = ssrRefFunctions.get(vm)

  if (!fn) {
    ssrRefFunctions.set(vm, [cb])
  } else {
    fn.push(cb)
  }
}
