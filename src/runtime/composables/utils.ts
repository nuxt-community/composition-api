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

function isObject(val: any) {
  return val !== null && typeof val === 'object'
}

/** https://github.com/unjs/defu */
function _defu<T>(baseObj: T, defaults: any): T {
  if (!isObject(defaults)) {
    return _defu(baseObj, {})
  }

  const obj = Object.assign({}, defaults)

  for (const key in baseObj) {
    if (key === '__proto__' || key === 'constructor') continue

    const val = baseObj[key]
    if (val === null) continue

    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = obj[key].concat(val)
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key])
    } else {
      obj[key] = val
    }
  }

  return obj
}

export const defu = (...args: any[]) =>
  args.reduce((p, c) => _defu(p, c), {} as any)
