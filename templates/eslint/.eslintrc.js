module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier',
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
