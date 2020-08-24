const { Preset } = require('use-preset')

module.exports = Preset.make('laravel')
  // List options
  .option('docker', false)
  .option('eslint', false)
  .option('gitlab', false)
  .option('github', false)
  .option('phpcs', false)
  .option('vuejs', false)
  .option('tailwindcss', false)

  // Apply TailwindCSS preset
  .apply('use-preset/laravel-tailwindcss')
  .title('Setting up TailwindCSS preset')
  .with('--no-interaction')
  .if(({ flags }) => Boolean(flags.tailwindcss))
  .chain()

  // Copy default files
  .copyDirectory('default')
  .title('Copy some config files')
  .to('/')
  .whenConflict('ask')
  .chain()

  // Install eslint
  .editJson('package.json')
  .title('Install ESLint & Prettier')
  .merge({
    scripts: {
      lint: 'eslint . --ext .js',
      'lint:fix': 'npm run lint -- --fix',
    },
    devDependencies: {
      eslint: '^7.7.0',
      'eslint-config-prettier': '^6.11.0',
      'eslint-plugin-prettier': '^3.1.4',
      'eslint-plugin-simple-import-sort': '^5.0.3',
      prettier: '^2.0.5',
    },
  })
  .if(({ flags }) => Boolean(flags.eslint))
  .chain()

  // Copy Docker config
  .copyDirectory('docker')
  .title('Copy Docker config files')
  .to('/')
  .whenConflict('ask')
  .if(({ flags }) => Boolean(flags.docker))
  .chain()

  // Copy Eslint config
  .copyDirectory('eslint')
  .title('Copy Eslint config files')
  .to('/')
  .whenConflict('ask')
  .if(({ flags }) => Boolean(flags.eslint))
  .chain()

  // Copy Github config
  .copyDirectory('github')
  .title('Copy Github config files')
  .to('/')
  .whenConflict('ask')
  .if(({ flags }) => Boolean(flags.github))
  .chain()

  // Copy Gitlab config
  .copyDirectory('gitlab')
  .title('Copy Gitlab config files')
  .to('/')
  .whenConflict('ask')
  .if(({ flags }) => Boolean(flags.gitlab))
  .chain()

  // Copy PHPCS config
  .copyDirectory('phpcs')
  .title('Copy PHPCS config files')
  .to('/')
  .whenConflict('ask')
  .if(({ flags }) => Boolean(flags.phpcs))
  .chain()

  .installDependencies()
