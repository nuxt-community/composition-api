/**
 * @typedef {import('@nuxt/types').Plugin} Plugin
 */

<% if (options.corejsPolyfill === '3') { %>
// Necessary polyfill for Composition API support for IE11
import 'core-js/features/reflect/own-keys'
<% } else if (options.corejsPolyfill === '2') { %>
// Necessary polyfill for Composition API support for IE11
import 'core-js/modules/es6.reflect.own-keys'
<% } %>

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
