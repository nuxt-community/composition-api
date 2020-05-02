import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const nuxtAppFile = name => ({
  input: `src/${name}.js`,
  output: [
    {
      file: `lib/${name}.js`,
      format: 'es',
    },
  ],
  external,
})

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    external,
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
    ],
  },
  nuxtAppFile('plugin'),
]
