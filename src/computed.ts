export function isComputed(cmp: any): boolean {
  return (
    cmp
      .__lookupSetter__('value')
      ?.toString?.()
      ?.includes('Computed property was assigned') === true
  )
}
