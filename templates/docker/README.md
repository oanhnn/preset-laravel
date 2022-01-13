# Project name

## Development

### Setup

```shell
$ git clone git@git.rabiloo.net:skrum/video-distribution-cms.git /path
$ cd /path
$ cp .env.example .env
$ make install
```

### Update verdors

```shell
$ make update
```

### Run dev

```shell
$ make dev
```

### Go to shell

Go to shell of Laravel container for running artisan commands

```shell
$ make shell
```

For other containers, using `docker-compose` :smile:

### Build docker image

Build docker image with special tag by environment variable `VERSION`

```shell
$ make build VERSION=latest
```

### Push docker image

Push docker image with special tag by environment variable `VERSION`

```shell
$ make push VERSION=latest
```
