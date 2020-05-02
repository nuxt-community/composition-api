import { resolve, join } from 'path'
import { Module } from '@nuxt/types'
import { ModuleThis } from '@nuxt/types/config/module'

function addToTemplate(this: ModuleThis, name: string) {
  const libRoot = resolve(__dirname, '..')
  const { dst } = this.addTemplate({
    src: resolve(libRoot, 'lib', name),
    fileName: join('composition-api', name),
    options: {},
  })
  return dst
}
const compositionApiModule: Module<any> = function () {
  const pluginDst = addToTemplate.call(this, 'plugin.js')

  this.options.plugins = this.options.plugins || []
  this.options.plugins.push(resolve(this.options.buildDir || '', pluginDst))
}

export default compositionApiModule
// eslint-disable-next-line
export const meta = require('../package.json')

export { useFetch } from './fetch'
export { withContext } from './context'
export { usePlugin, callPluginHooks } from './hooks'

export * from '@vue/composition-api'
