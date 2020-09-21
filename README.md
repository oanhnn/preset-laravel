# My Laravel Preset

## Usage

```shell
$ composer create-project laravel/laravel /path/to/project
$ cd /path/to/project
$ npx use-preset https://github.com/oanhnn/preset-laravel.git
```

Options:

| Option          | Description                          |
|:----------------|:-------------------------------------|
| `--docker`      | Add Docker setup files               |
| `--eslint`      | Add ESLint setup files               |
| `--gitlab`      | Add Gitlab CI config file            |
| `--github`      | Add Github Workflow setup files      |
| `--phpcs`       | Add PHPCS default config file        |
| `--vuejs`       | Add VueJS setup files                |
| `--tailwindcss` | Add TailwindCSS setup file           |

> Note: This preset will change value of `DB_USERNAME`, `DB_PASSWORD`, `REDIS_PASSWORD` in `.env` and `.env.example`

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

If you discover any security related issues, please email to [Oanh Nguyen](mailto:oanhnn.bk@gmail.com) instead of 
using the issue tracker.

## Credits

- [Oanh Nguyen](https://github.com/oanhnn)
- [All Contributors](../../contributors)

## License

This project is released under the MIT License.   
Copyright © 2020 [Oanh Nguyen](https://oanhnn.github.io).
