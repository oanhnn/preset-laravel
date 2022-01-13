const pkg = require('./package.json')

const hasPkg = (p) =>
  (typeof pkg.dependencies === 'object' && pkg.dependencies[p]) ||
  (typeof pkg.devDependencies === 'object' && pkg.devDependencies[p])

const hasVue = hasPkg('vue')
const hasTs = hasPkg('typescript')

const configs = [
  'eslint:recommended',
  'plugin:import/recommended',
  hasTs
    ? ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript']
    : '',
  hasVue
    ? [
        hasPkg('@vue/compiler-sfc') ? 'plugin:vue/vue3-recommended' : 'plugin:vue/recommended',
        hasTs ? '@vue/typescript/recommended' : '',
      ]
    : '',
  'plugin:prettier/recommended',
]
  .flat()
  .filter((v) => v != '')

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json']
const resolver = {
  alias: {
    map: [['@', './resources/js']],
  },
}
try {
  resolver[require.resolve('eslint-import-resolver-node')] = {}
} catch (error) {}

try {
  resolver[require.resolve('eslint-import-resolver-typescript')] = {}
} catch (error) {}

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: configs,
  globals: {
    // axios: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'import/order': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'warn',
  },
  settings: {
    'import/resolver': resolver,
    'import/extensions': extensions,
  },
}
