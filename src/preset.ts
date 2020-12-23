import fs from 'fs'
import path from 'path'
import { Preset } from 'apply'

Preset.setName('oanhnn/laravel')

// List options
Preset.option('docker', false)
  .option('eslint', false)
  .option('gitlab', false)
  .option('github', false)
  .option('phpcs', false)
  .option('vue2', false)
  .option('vue3', false)
  .option('mix6', false)
  .option('typescript', false)

Preset.hook(({ targetDirectory, options }) => {
  // Make backup .env file
  if (fs.existsSync(path.join(targetDirectory, '.env'))) {
    fs.copyFileSync(
      path.join(targetDirectory, '.env'),
      path.join(targetDirectory, '.env.bak' + new Date().getTime())
    )
  }

  // Option vue3 require mix6
  if (options.vue3) {
    options.mix6 = true
  }
})

// Extract files from the preset's `default` template directory to the target directory.
Preset.extract('default')
  .withDots(true)
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy default files')

// Update environment variables
Preset.env('.env')
  .set('DB_USERNAME', 'dev')
  .set('DB_PASSWORD', 'devpass')
  .set('REDIS_PASSWORD', 'password')
  .createIfMissing()
  .withTitle('Update .env file')

// Install Typescript
Preset.group((preset) => {
  preset.editNodePackages().merge({
    typescript: '^4.0',
  })

  preset
    .extract('typescript')
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Install Typescript')
  .ifOptionEquals('typescript', true)

// TODO: Install Vue 2

// TODO: Install Vue 3

// Laravel Mix 6
Preset.group((preset) => {
  // Install Laravel Mix and update npm scripts
  preset.editNodePackages().merge({
    scripts: {
      development: 'mix',
      watch: 'mix watch',
      'watch-poll': 'mix watch -- --watch-options-poll=1000',
      hot: 'mix --hot',
      production: 'mix --production',
    },
    devDependencies: {
      'laravel-mix': '^6.0.2',
    },
  })

  // Override webpack.mix.js
  preset
    .extract('mix')
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Install Laravel Mix 6')
  .ifOptionEquals('mix6', true)

// Eslint
Preset.group((preset) => {
  const extensions = ['.js']
  let devDependencies: Record<string, string> = {
    eslint: '^7.16',
    'eslint-config-prettier': '^7.1',
    'eslint-import-resolver-alias': '^1.1',
    'eslint-plugin-import': '^2.22',
    'eslint-plugin-prettier': '^3.3',
    prettier: '^2.2',
  }

  if (preset.options.typescript) {
    extensions.push('.ts')
    devDependencies = {
      ...devDependencies,
      '@typescript-eslint/eslint-plugin': '^4.11',
      '@typescript-eslint/parser': '^4.11',
    }
  }

  if (preset.options.vue2 || preset.options.vue3) {
    extensions.push('.vue')
    devDependencies = {
      ...devDependencies,
      'eslint-plugin-vue': '^7.3',
    }
  }

  // Install ESlint
  preset.editNodePackages().merge({
    devDependencies,
    scripts: {
      lint: `eslint . --ext ${extensions.join(',')}`,
      'lint:fix': 'npm run lint -- --fix',
    },
  })

  preset
    .extract('eslint')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  preset
    .edit('.eslint.js')
    .if(preset.options.vue2)
    .addAfter("'plugin:import/recommended',", "'plugin:vue/recommended',")
    .withIndent(2)

  preset
    .edit('.eslint.js')
    .if(preset.options.vue2)
    .addAfter("'plugin:import/recommended',", "'plugin:vue/vue3-recommended',")
    .withIndent(2)

  preset
    .edit('.eslint.js')
    .if(preset.options.typescript)
    .addBefore(
      "'plugin:import/recommended',",
      "'@typescript-eslint/recommended',"
    )
    .withIndent(2)
})
  .withTitle('Install ESlint')
  .ifOptionEquals('eslint', true)

// Docker
Preset.extract('docker')
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Docker config files')
  .ifOptionEquals('docker', true)

// GitHub
Preset.extract('github')
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Github config files')
  .ifOptionEquals('github', true)

// Gitlab
Preset.extract('gitlab')
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Gitlab config files')
  .ifOptionEquals('gitlab', true)

// PHPCS
Preset.extract('phpcs')
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy PHPCS config file')
  .ifOptionEquals('phpcs')

// Clean up
Preset.delete(['phpunit.xml', '.styleci.yml']).withTitle('Clean up')

// Install PHP dependencies
Preset.installDependencies('php')
  .withTitle('Install PHP dependencies')
  .ifUserApproves()

// Install NodeJS dependencies
Preset.installDependencies('node')
  .withTitle('Install NodeJS dependencies')
  .ifUserApproves()
