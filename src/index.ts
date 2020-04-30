import { resolve, join } from 'path'
export { useFetch } from './fetch'
export { withContext } from './context'
import { Module } from '@nuxt/types'
const libRoot = resolve(__dirname, '..')

const compositionApiModule: Module<any> = function () {
  const { dst } = this.addTemplate({
    src: resolve(libRoot, 'lib', 'plugin.js'),
    fileName: join('composition-api', 'plugin.js'),
    options: {},
  })
  this.options.plugins.push(resolve(this.options.buildDir, dst))
}

export default compositionApiModule
