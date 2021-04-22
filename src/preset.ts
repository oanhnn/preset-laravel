import { existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { Preset } from 'apply'

Preset.setName('oanhnn/laravel')

// List options
Preset.option('default', true)
  .option('docker', false)
  .option('github', false)
  .option('gitlab', false)
  .option('phpcs', false)
  .option('tailwindcss', false)
  .option('typescript', false)
  .option('vue3', false)
  .option('vue2', false)
  .option('eslint', false)
  .option('psalm', false)

Preset.hook(({ options, targetDirectory }) => {
  // Set vue2 to FALSE if vue3 is TRUE
  options.vue = options.vue3 || options.vue2
  options.vue2 = !options.vue3 && options.vue2

  // Create target directory if it is not existed
  options.targetPath = resolve(targetDirectory)
  if (!existsSync(options.targetPath)) {
    mkdirSync(options.targetPath)
  }
}).withTitle('Prepare options')

// Create project
// - [x] Create project by Composer
// - [x] Copy .env.example to .env (Composer post create project hook)
// - [x] Generate APP_KEY (Composer post create project hook)
// - [x] Initial Git
Preset.group((preset) => {
  preset.execute(
    'composer',
    'create-project',
    'laravel/laravel',
    preset.options.targetPath,
    '--ignore-platform-reqs',
    '--prefer-dist'
  )

  preset.execute('git', 'init')
})
  .withTitle('Create project')
  .ifDirectoryEmpty()

// Default tasks:
// - [x] Setup prettier for format code
// - [x] Setup .editorconfig and .gitignore file
// - [x] Setup PHPUnit
// - [x] Clean up some files
Preset.group((preset) => {
  // Extract files from the preset's `default` template directory to the target directory.
  preset
    .extract('default')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  // Setup prettier, postcss
  preset
    .editNodePackages()
    .set('private', true)
    .remove(['lodash', 'axios'])
    .addDev('prettier', '^2.2')
    .merge({
      scripts: {
        format: "prettier --write '**/*.{ts,js,vue,css,html,json}'",
      },
      engines: { node: '>= 14.x.x' },
    })

  // Comment all source code begin with `window.`
  preset.edit('resources/js/bootstrap.js').update((content) => {
    return content.replace(/^window\./gm, '// window.')
  })

  // Clean up some files
  preset.delete(['phpunit.xml', '.styleci.yml']).withTitle('Clean up')
})
  .withTitle('Execute default tasks')
  .ifOption('default')

// Tailwind tasks
// - [x] Setup PostCSS 8.x and TailwindCSS 2.x
Preset.group((preset) => {
  // Extract files from the preset's `default` template directory to the target directory.
  preset
    .extract('tailwindcss')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  // Setup tailwindcss, postcss
  preset
    .editNodePackages()
    .addDev('autoprefixer', '^10.2')
    .addDev('postcss', '^8.2')
    .addDev('postcss-import', '^14.0')
    .addDev('postcss-nested', '^5.0')
    .addDev('tailwindcss', '^2.1')
    .addDev('@tailwindcss/forms', '^0.2')
    .addDev('@tailwindcss/typography', '^0.4')
})
  .withTitle('Execute tailwind tasks')
  .ifOption('tailwindcss')

// Docker
// - [x] Setup docker for development (laravel/sail)
// - [x] Setup docker for production
Preset.group((preset) => {
  preset
    .extract('docker')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  // Install laravel/sail
  preset.execute('composer', 'require', '--dev', 'laravel/sail')
  preset.execute(
    'php',
    'artisan',
    'sail:install',
    '--with=mysql,redis,mailhog',
    '--no-interaction'
  )
})
  .withTitle('Copy Docker config files')
  .ifOption('docker')

// GitHub
// - [x] Setup Github Workflow
// - [x] Setup Github issue templates
Preset.extract('github')
  .withDots(true)
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Github config files')
  .ifOption('github')

// Gitlab
// - [x] Setup Gitlab CI
// - [x] Setup Gitlab issue templates
Preset.extract('gitlab')
  .withDots(true)
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Gitlab config files')
  .ifOption('gitlab')

// PHPCS
// - [x] Add squizlabs/php_codesniffer
// - [x] Setup coding style
Preset.group((preset) => {
  preset.editPhpPackages().addDev('squizlabs/php_codesniffer', '^3.5')

  preset
    .extract('phpcs')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Copy PHPCS config file')
  .ifOption('phpcs')

// PSALM
// - [x] Add vimeo/psalm and plugin for Laravel
// - [x] Setup coding file
Preset.group((preset) => {
  preset
    .editPhpPackages()
    .addDev('vimeo/psalm', '^4.6')
    .addDev('psalm/plugin-laravel', '^1.4')

  preset
    .extract('psalm')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Copy PSALM config file')
  .ifOption('psalm')

// Install Typescript
// - [x] Add Typescript
// - [x] Setup tsconfig.json
Preset.group((preset) => {
  // Add Typescript
  preset.editNodePackages().addDev('typescript', '^4.0')

  // Setup tsconfig.json
  preset
    .extract('typescript')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Install Typescript')
  .ifOption('typescript')

// Install Vue 2
// - [x] Add Vue 2
// - [x] ...
Preset.group((preset) => {
  preset
    .editNodePackages()
    .remove(['@vue/compiler-sfc'])
    .addDev('vue', '^2.6')
    .addDev('vue-template-compiler', '^2.6')
    .addDev('vue-loader', '^15')
})
  .withTitle('Install Vue 2')
  .ifOption('vue2')

// Install Vue 3
// - [x] Add Vue 3
// - [x] ...
Preset.group((preset) => {
  preset
    .editNodePackages()
    .remove(['vue-template-compiler'])
    .addDev('vue', '^3.0')
    .addDev('@vue/compiler-sfc', '^3.0')
    .addDev('vue-loader', '^16.1')
})
  .withTitle('Install Vue 3')
  .ifOption('vue3')

// EsLint
// - [x] Add EsLint
// - [x] Setup config file
Preset.group((preset) => {
  const extensions = ['.js', '.jsx']
  const stacks: string[] = []
  let devDependencies: Record<string, string> = {
    eslint: '^7.17',
    'eslint-config-prettier': '^8.1',
    'eslint-plugin-import': '^2.22',
    'eslint-plugin-node': '^11.1',
    'eslint-plugin-prettier': '^3.3',
    'eslint-plugin-promise': '^4.2',
  }

  if (preset.options.vue) {
    extensions.push('.vue')
    stacks.push('vue')
    devDependencies = {
      ...devDependencies,
      'eslint-plugin-vue': '^7.3',
      '@vue/eslint-config-prettier': '^6.0',
      '@vue/eslint-config-standard': '^6.0',
    }
  }

  if (preset.options.typescript) {
    extensions.push('.ts', '.tsx')
    stacks.push('ts')
    devDependencies = {
      ...devDependencies,
      'eslint-import-resolver-typescript': '^2.3',
      '@typescript-eslint/eslint-plugin': '^4.11',
      '@typescript-eslint/parser': '^4.11',
    }
    if (preset.options.vue) {
      devDependencies = {
        ...devDependencies,
        '@vue/eslint-config-typescript': '^7.0',
      }
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
    .extract(['eslint/.eslintignore', `eslint/${stacks.join('-')}.eslintrc.js`])
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
    .ifOption('vue3')
})
  .withTitle('Install ESlint')
  .ifOption('eslint')

// Install PHP dependencies
Preset.installDependencies('php')
  .withTitle('Install PHP dependencies')
  .ifUserApproves()

// Install NodeJS dependencies
Preset.installDependencies('node')
  .withTitle('Install NodeJS dependencies')
  .ifUserApproves()
