import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

import { globalPlugin } from '@nuxtjs/composition-api'

if (!('__composition_api_installed__' in Vue)) {
  Vue.use(CompositionApi)
}

export default globalPlugin
