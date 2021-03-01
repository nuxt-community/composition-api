import { defineSirocConfig } from 'siroc'
import replace from '@rollup/plugin-replace'
import { readJSONSync } from 'fs-extra'
import { resolve } from 'upath'

export default defineSirocConfig({
  hooks: {
    'build:extendRollup'(pkg, { rollupConfig }) {
      rollupConfig.forEach(config => {
        if (!config.plugins) return
        config.plugins.push(
          replace({
            values: {
              __NUXT_CAPI_VERSION__: readJSONSync(
                resolve(__dirname, 'package.json')
              ).version,
            },
          })
        )
      })
    },
  },
})
