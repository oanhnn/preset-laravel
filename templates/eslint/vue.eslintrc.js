module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:import/recommended',
    '@vue/standard',
    '@vue/prettier/recommended',
  ],
  globals: {
    // axios: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/order': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './resources/js']],
        extensions: ['.js', '.vue', '.json'],
      },
    },
  },
}
