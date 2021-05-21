import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

if (process.env.NODE_ENV === 'test') {
  Vue.use(CompositionApi)
}

export * from './composables'
