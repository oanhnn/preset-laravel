const mix = require('laravel-mix')
const { plugins } = require('./postcss.config')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .disableNotifications()
  .js('resources/js/app.js', 'public/js')
  .postCss('resources/css/app.css', 'public/css', plugins)
  .sourceMaps()

if (mix.inProduction()) {
  mix.version()
}
