import { getCurrentInstance as getVM } from 'vue'

export function validateKey<T>(key?: T): asserts key is T {
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding '@nuxtjs/composition-api/dist/babel-plugin' to your Babel plugins."
    )
  }
}

export const getCurrentInstance = () => {
  const vm = getVM()

  if (!vm) return

  return vm.proxy
}
