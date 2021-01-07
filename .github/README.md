# My Laravel Preset

## Usage

```shell
$ composer create-project laravel/laravel /path/to/project
$ cd /path/to/project
$ npx apply https://github.com/oanhnn/preset-laravel.git
```

Options:

| Option             | Description                          |
|:-------------------|:-------------------------------------|
| `--docker`         | Add Docker setup files               |
| `--eslint`         | Add ESLint setup files               |
| `--gitlab`         | Add Gitlab CI config file            |
| `--github`         | Add Github Workflow setup files      |
| `--phpcs`          | Add PHPCS default config file        |
| `--vue2`           | Add Vue 2 setup files                |
| `--vue3`           | Add Vue 3 setup files                |
| `--mix6`           | Add Laravel Mix 6 setup files        |
| `--typescript`     | Add Typescript setup files           |
| `--no-interaction` | Run without interaction mode         |

> Note: This preset may be change value of some environment variables in `.env` and `.env.example`

## Changelog

See all change logs in [CHANGELOG](CHANGELOG.md)

## Coding style check

```shell
$ git clone git@github.com/oanhnn/preset-laravel.git /path
$ cd /path
$ yarn
$ yarn lint
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact to [me](#contact) instead of using the issue tracker.

## License

This project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (c) 2021 [Oanh Nguyen](https://github.com/oanhnn)

[![@oanhnn](https://img.shields.io/badge/github-oanhnn-green.svg)](https://github.com/oanhnn) [![@oanhnn](https://img.shields.io/badge/twitter-oanhnn-blue.svg)](https://twitter.com/oanhnn)
