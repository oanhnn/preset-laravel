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
  .option('typescript', false)

Preset.hook(({ targetDirectory }) => {
  // Make backup .env file
  if (fs.existsSync(path.join(targetDirectory, '.env'))) {
    fs.copyFileSync(
      path.join(targetDirectory, '.env'),
      path.join(targetDirectory, '.env.bak' + new Date().getTime())
    )
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

// Install Vue 2
Preset.group((preset) => {
  preset.editNodePackages().merge({
    devDependencies: {
      vue: '^2.6',
      'vue-template-compiler': '^2.6',
    },
  })
})
  .withTitle('Install Vue 2')
  .ifOptionEquals('vue2', true)

// Install Vue 3
Preset.group((preset) => {
  preset
    .editNodePackages()
    .delete(['vue', 'vue-template-compiler', 'vue-loader'])
    .merge({
      devDependencies: {
        vue: '^3.0',
        '@vue/compiler-sfc': '^3.0',
        'vue-loader': '^16.1',
      },
    })
})
  .withTitle('Install Vue 3')
  .ifOptionEquals('vue3', true)

// Eslint
Preset.group((preset) => {
  const extensions = ['.js']
  const stacks = []
  let devDependencies: Record<string, string> = {
    eslint: '^7.17',
    'eslint-config-prettier': '^7.1',
    'eslint-import-resolver-alias': '^1.1',
    'eslint-plugin-import': '^2.22',
    'eslint-plugin-prettier': '^3.3',
    prettier: '^2.2',
  }

  if (preset.options.vue2 || preset.options.vue3) {
    extensions.push('.vue')
    stacks.push('vue')
    devDependencies = {
      ...devDependencies,
      'eslint-plugin-vue': '^7.3',
    }
  }

  if (preset.options.typescript) {
    extensions.push('.ts')
    stacks.push('ts')
    devDependencies = {
      ...devDependencies,
      'eslint-import-resolver-typescript': '^2.3',
      '@typescript-eslint/eslint-plugin': '^4.11',
      '@typescript-eslint/parser': '^4.11',
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
    .extract(['eslint/.eslintignore', 'eslint/.prettierrc.js'])
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  preset
    .extract()
    .from(`eslint/${stacks.join('-')}.eslintrc.js`)
    .to('.eslintrc.js')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  preset
    .edit('.eslintrc.js')
    .update((content) => {
      return content.replace(
        "'plugin:vue/recommended',",
        "'plugin:vue/vue3-recommended',"
      )
    })
    .ifOptionEquals('vue3', true)
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
