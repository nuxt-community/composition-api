import { resolve, join } from 'path'
import { Module } from '@nuxt/types'

const compositionApiModule: Module<any> = function () {
  const libRoot = resolve(__dirname, '..')
  const { dst } = this.addTemplate({
    src: resolve(libRoot, 'lib', 'plugin.js'),
    fileName: join('composition-api', 'plugin.js'),
    options: {},
  })
  this.options.plugins = this.options.plugins || []
  this.options.plugins.push(resolve(this.options.buildDir || '', dst))
}

export default compositionApiModule
// eslint-disable-next-line
export const meta = require('../package.json')

export { useFetch } from './fetch'
export { withContext } from './context'

export * from '@vue/composition-api'
