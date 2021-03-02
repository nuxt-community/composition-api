import { defineSirocConfig } from 'siroc'
import replace from '@rollup/plugin-replace'
import { resolve } from 'upath'

import jiti from 'jiti'

const getFile = jiti()

export default defineSirocConfig({
  hooks: {
    'build:extendRollup'(pkg, { rollupConfig }) {
      rollupConfig.forEach(config => {
        if (!config.plugins) return
        config.plugins.push(
          replace({
            preventAssignment: true,
            values: {
              __HELPER_FUNCTIONS__: JSON.stringify(
                Object.keys(getFile(resolve(__dirname, './src/entrypoint.ts')))
              ),
            },
          })
        )
      })
    },
  },
})
