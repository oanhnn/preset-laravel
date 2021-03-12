const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/view/**/*.blade.php',
    './public/**/*.php',
    './public/**/*.html',
    './resources/js/**/*.js',
    './resources/js/**/*.jsx',
    './resources/js/**/*.ts',
    './resources/js/**/*.tsx',
    './resources/js/**/*.vue',
  ],
  darkMode: 'media', // boolean or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
