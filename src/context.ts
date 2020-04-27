import { getCurrentInstance } from '@vue/composition-api'
import { Context } from '@nuxt/types'

interface ContextCallback {
  (context: Context): void
}

export const withContext = (callback: ContextCallback) => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')

  callback(vm.$nuxt.context)
}
