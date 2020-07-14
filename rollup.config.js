import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import copy from 'rollup-plugin-copy'

import pkg from './package.json'

export default [
  ...['src/index.ts', 'src/entrypoint.ts'].map(input => ({
    input,
    output: [
      {
        dir: 'lib',
        format: 'es',
      },
      {
        dir: 'lib/cjs',
        format: 'cjs',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      copy({
        targets: [{ src: 'src/plugin.js', dest: 'lib' }],
      }),
    ],
  })),
  {
    input: 'src/entrypoint.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: 'src/babel.ts',
    output: [
      {
        file: 'lib/babel.js',
        format: 'cjs',
      },
      {
        file: 'lib/babel.es.js',
        format: 'es',
      },
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: { declaration: false },
        },
      }),
    ],
  },
]
