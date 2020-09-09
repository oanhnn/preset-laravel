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

  // Copy all file from `default` directory to project's root
  .copyDirectory('default')
  .to('/')
  .whenConflict('ask')
  .title('Copy some default config files')
  .chain()

  // Update TailwindCSS config
  .editJson('package.json')
  .merge({
    devDependencies: {
      '@tailwindcss/form': '^0.2',
      '@tailwindcss/ui': '^0.6',
      '@tailwindcss/typography': '^0.2',
      'postcss-nested': '^4',
      'postcss-import': '^12',
      autoprefixer: '^9.8',
      tailwindcss: '^1.8',
    },
  })
  .title('Update TailwindCSS plugins')
  .if(({ flags }) => Boolean(flags.tailwindcss))
  .chain()

  // Copy all file from `default` directory to project's root
  .copyDirectory('tailwindcss')
  .to('/')
  .whenConflict('ask')
  .title('Update TailwindCSS config')
  .if(({ flags }) => Boolean(flags.tailwindcss))
  .chain()

  // Install eslint
  .editJson('package.json')
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
  .title('Install ESLint & Prettier')
  .if(({ flags }) => Boolean(flags.eslint))
  .chain()

  // Copy Eslint config
  .copyDirectory('eslint')
  .to('/')
  .whenConflict('override')
  .title('Copy Eslint config files')
  .if(({ flags }) => Boolean(flags.eslint))
  .chain()

  // Copy Docker config
  .copyDirectory('docker')
  .to('/')
  .whenConflict('ask')
  .title('Copy Docker config files')
  .if(({ flags }) => Boolean(flags.docker))
  .chain()

  // Copy Github config
  .copyDirectory('github')
  .to('/')
  .whenConflict('ask')
  .title('Copy Github config files')
  .if(({ flags }) => Boolean(flags.github))
  .chain()

  // Copy Gitlab config
  .copyDirectory('gitlab')
  .to('/')
  .whenConflict('ask')
  .title('Copy Gitlab config files')
  .if(({ flags }) => Boolean(flags.gitlab))
  .chain()

  // Copy PHPCS config
  .copyDirectory('phpcs')
  .to('/')
  .whenConflict('ask')
  .title('Copy PHPCS config files')
  .if(({ flags }) => Boolean(flags.phpcs))
  .chain()

  // Reformating `package.json` file with indentation 2 spaces
  .editJson('package.json')
  .indentWith(2)
  .title('Reformating `package.json` file with indentation 2 spaces')
  .chain()

  // Reformating `composer.json` file with indentation 2 spaces
  .editJson('composer.json')
  .indentWith(2)
  .title('Reformating `composer.json` file with indentation 2 spaces')
  .chain()

  // Update Node dependencies
  .installDependencies()
  .for('node')
  .title('Install Node dependencies')
  .chain()

  // Update PHP dependencies
  .installDependencies()
  .for('php')
  .title('Update PHP dependencies')
  .chain()
