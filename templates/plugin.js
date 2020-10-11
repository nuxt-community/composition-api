<% if (options.corejsPolyfill === '3') { %>
// Necessary polyfill for Composition API support for IE11
import 'core-js/features/reflect/own-keys'
<% } else if (options.corejsPolyfill === '2') { %>
// Necessary polyfill for Composition API support for IE11
import 'core-js/modules/es6.reflect.own-keys'
<% } %>

import { globalPlugin } from '@nuxtjs/composition-api'

export default globalPlugin
