import { defineSirocConfig } from 'siroc'

export default defineSirocConfig({
  rollup: {
    externals: ['@nuxtjs/composition-api/dist/runtime/globals'],
  },
})
