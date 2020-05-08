export function isComputed(cmp: any): boolean {
  return (
    Object.getOwnPropertyDescriptor(cmp, 'value')
      ?.value?.set?.toString?.()
      ?.includes('Computed property was assigned') === true
  )
}
