import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

export { onFetch } from './fetch'
export { withContext } from './context'
