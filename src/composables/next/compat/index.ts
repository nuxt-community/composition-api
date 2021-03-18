import { globalNuxt } from '../../globals'

export function isInitialLoad() {
  return process.client && !(window[globalNuxt] as any).__isReady
}
