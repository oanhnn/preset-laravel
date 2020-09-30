module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', '@vue/prettier'],
  globals: {
    // axios: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier', 'simple-import-sort'],
  rules: {
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
