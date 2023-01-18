import type { Options } from 'tsup'

const env = process.env.NODE_ENV
const isProduction = env === 'production'

export const tsup: Options = {
  splitting: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: isProduction,
  bundle: isProduction,
  skipNodeModulesBundle: true,
  entry: ['src/**/*.ts'],
  target: 'es2020',
  outDir: isProduction ? 'dist' : 'lib'
}
