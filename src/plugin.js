/**
 * @typedef {import('@nuxt/types').Plugin} Plugin
 */

import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

import { setSSRContext } from 'nuxt-composition-api'

Vue.use(CompositionApi)

/**
 *
 * @type {Plugin} plugin
 */
const plugin = context => {
  if (!process.server) return

  const { setup } = context.app
  context.app.setup = (...args) => {
    if (setup instanceof Function) setup(...args)
    // Run instantiating functions that must be run within setup()
  }
  if (context.app.context.ssrContext) {
    setSSRContext(context.app.context.ssrContext)
  }
}

export default plugin
