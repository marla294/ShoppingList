module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/@themesberg/flowbite/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@themesberg/flowbite/plugin')
  ],
}
