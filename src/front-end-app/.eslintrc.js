module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'plugin:react/recommended'],
  plugins: ['react', 'prettier'],
  globals: {
    it: false,
    fetch: false,
  },
  rules: {
    'no-extra-semi': 'error',
    'comma-dangle': 'off',
  },
}
