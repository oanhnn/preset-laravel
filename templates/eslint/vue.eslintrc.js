module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue-recommended',
    'plugin:import/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    // axios: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'prettier',
    'vue',
  ],
  rules: {
    'import/order': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './resources/js'],
        ],
        extensions: ['.js', '.json'],
      },
    },
  },
}
