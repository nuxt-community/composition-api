/**
 * @typedef {import('@nuxt/types').Plugin} Plugin
 */

import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

import { callPluginHooks } from 'nuxt-composition-api'

Vue.use(CompositionApi)

/**
 *
 * @type {Plugin} plugin
 */
const plugin = function (context, inject) {
  callPluginHooks(context, inject)
}

export default plugin
