import { resolve, join } from 'path'
import { Module } from '@nuxt/types'

const compositionApiModule: Module<any> = function () {
  const libRoot = resolve(__dirname, '..')
  const { dst } = this.addTemplate({
    src: resolve(libRoot, 'lib', 'plugin.js'),
    fileName: join('composition-api', 'plugin.js'),
    options: {},
  })

  this.options.build = this.options.build || {}
  this.options.build.babel = this.options.build.babel || {}
  this.options.build.babel.plugins = this.options.build.babel.plugins || []
  this.options.build.babel.plugins.push(join(__dirname, 'babel'))

  this.options.build.transpile = this.options.build.transpile || []
  this.options.build.transpile.push(/nuxt-composition-api/)

  this.options.plugins = this.options.plugins || []
  this.options.plugins.push(resolve(this.options.buildDir || '', dst))
}

export default compositionApiModule
// eslint-disable-next-line
export const meta = require('../package.json')

export { useFetch } from './fetch'
export { withContext } from './context'
export { ssrRef, onServerPrefetch, setSSRContext } from './ssr-ref'

export {
  ComponentRenderProxy,
  InjectionKey,
  PropOptions,
  PropType,
  Ref,
  SetupContext,
  VueWatcher,
  computed,
  createComponent,
  createElement,
  defineComponent,
  getCurrentInstance,
  inject,
  isRef,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  ref,
  set,
  toRefs,
  watch,
  watchEffect,
} from '@vue/composition-api'
