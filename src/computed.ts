import { isRef } from '@vue/composition-api'

export function isComputed(cmp: unknown): boolean {
  return (
    isRef(cmp) &&
    Object.getOwnPropertyDescriptors(cmp)
      .value.set!.toString()
      .includes('Computed property was assigned')
  )
}
