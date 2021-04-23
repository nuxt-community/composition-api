import { VueConstructor } from 'vue'
import { getCurrentInstance as getVM } from '@vue/composition-api'

export function validateKey<T>(key?: T): asserts key is T {
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding '@nuxtjs/composition-api/dist/babel-plugin' to your Babel plugins."
    )
  }
}

export type ComponentInstance = InstanceType<VueConstructor>

export function getCurrentInstance() {
  const vm = getVM()

  if (!vm) return

  return vm.proxy as InstanceType<VueConstructor>
}
