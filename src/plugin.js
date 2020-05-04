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
const plugin = function (context) {
  if (process.server && context.app.context.ssrContext) {
    setSSRContext(context.app.context.ssrContext)
  }
}

export default plugin
