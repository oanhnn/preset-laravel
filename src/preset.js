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
  .option('interaction', true)

  // Copy all file from `default` directory to project's root
  .copyDirectory('default')
  .to('/')
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
  .title('Copy some default config files')
  .chain()

  // Update TailwindCSS config
  .editJson('package.json')
  .merge({
    devDependencies: {
      '@tailwindcss/custom-forms': '^0.2',
      '@tailwindcss/ui': '^0.6',
      '@tailwindcss/typography': '^0.2',
      'postcss-nested': '^4.2',
      'postcss-import': '^12.0',
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
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
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
      eslint: '^7.10',
      'eslint-config-prettier': '^6.12',
      'eslint-plugin-prettier': '^3.1',
      'eslint-plugin-simple-import-sort': '^5.0',
      prettier: '^2.1',
    },
  })
  .title('Install ESLint & Prettier')
  .if(({ flags }) => Boolean(flags.eslint))
  .chain()

  // Copy Eslint config
  .copyDirectory('eslint')
  .to('/')
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
  .title('Copy Eslint config files')
  .if(({ flags }) => Boolean(flags.eslint))
  .chain()

  // Install eslint
  .editJson('package.json')
  .merge({
    scripts: {
      lint: 'eslint . --ext .js,.vue',
    },
    devDependencies: {
      '@vue/eslint-config-prettier': '^6.0',
      'babel-eslint': '^10.1',
      'eslint-plugin-vue': '^7.0',
      'vue-eslint-parser': '^7.1',
    },
  })
  .title('Install ESLint & Prettier for VueJS')
  .if(({ flags }) => Boolean(flags.eslint) && Boolean(flags.vuejs))
  .chain()

  // Copy Eslint config
  .copyDirectory('eslint-vue')
  .to('/')
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
  .title('Copy Eslint config files for VueJS')
  .if(({ flags }) => Boolean(flags.eslint && flags.vuejs))
  .chain()

  // Copy Docker config
  .copyDirectory('docker')
  .to('/')
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
  .title('Copy Docker config files')
  .if(({ flags }) => Boolean(flags.docker))
  .chain()

  // Copy Github config
  .copyDirectory('github')
  .to('/')
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
  .title('Copy Github config files')
  .if(({ flags }) => Boolean(flags.github))
  .chain()

  // Copy Gitlab config
  .copyDirectory('gitlab')
  .to('/')
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
  .title('Copy Gitlab config files')
  .if(({ flags }) => Boolean(flags.gitlab))
  .chain()

  // Copy PHPCS config
  .copyDirectory('phpcs')
  .to('/')
  .whenConflict(({ flags }) => (flags.interaction ? 'ask' : 'override'))
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

  // Update environment variables
  .edit(['.env', '.env.example'])
  .replace(/DB_USERNAME=.*/)
  .with('DB_USERNAME=dev')
  .replace(/DB_PASSWORD=.*/)
  .with('DB_PASSWORD=devpass')
  .replace(/REDIS_PASSWORD=.*/)
  .with('REDIS_PASSWORD=password')
  .title('Update some environment variables')
  .chain()

  // Clean up
  .delete()
  .files(['phpunit.xml', '.styleci.yml'])
  .title('Clean up')
  .chain()

  // Update Node dependencies
  .installDependencies()
  .for('node')
  .withoutAsking(({ flags }) => Boolean(flags.interaction))
  .title('Install Node dependencies')
  .chain()

  // Update PHP dependencies
  .installDependencies()
  .for('php')
  .withoutAsking(({ flags }) => Boolean(flags.interaction))
  .title('Install PHP dependencies')
  .chain()
