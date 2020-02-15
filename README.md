# mongo-issue

> demo repos to reproduce mongodb driver issues after upgrade

Most installations of packages depending on `mongodb` package will fetch the current mongodb driver as dependency. The (as of now) *current* version `mongodb@3.5.3` breaks tests in certain scenarios while a previous version `mongodb@3.4.1` didn't.

```sh
$ tap test/**/*.test.js

test/noop.test.js
  Test Setup
    ✓ Tests and assertions should work

  Noop Service
    a valid GET Request
      ✓ should not error
      ✓ response ok
      ✓ payload ok

  1) Cannot use a session that has ended

  4 passing (1s)
  1 failing

  1) test/noop.test.js Cannot use a session that has ended:
     Error: Cannot use a session that has ended
```

Turns out that this was caused by not properly awaiting promises to finish, ie.:

#### worked until <=3.4.1

```js
module.exports = async fastify => {
  const collection = fastify.mongo.db.collection('issue')
  collection.createIndex({ id: 1 }, { unique: true })

  // [...] 
}
```

#### fixed for >=3.5.0 upwards

```js
module.exports = async fastify => {
  const collection = fastify.mongo.db.collection('issue')
  await collection.createIndex({ id: 1 }, { unique: true })

  // [...] 
}
```

Quite obvious as a server daemon will run "forever" and so background creation of index will finish some time. In a test the connection seams to get cut before finishing that background creation, which yields an error and breaks tests. One could consider that as a bug of mongodb-driver... But, still: Promises should be awaited and that way we "don't run into that bug". Hope that doesn't compromise startup time.

Keeping basic default instructions below. For reproduction no config changes are needed.

---

## Prerequisits

* node 12.x / yarn 1.21
* mongodb running on localhost

## Install

```sh
$ git clone git@github.com:uscreen/mongo-issue.git
$ cd ./mongo-issue && make start
```

Packages get installed if needed, application will start (managed by pm2) and you will

## Usage

* `make start`: start app on local dev
* `make logs`: watch logs
* `make stop`: stop app
* `make test`: test app

## Configure

Configuration is read by dotenv from `app/.env` file and validated _[optional modified]_ by `app/config.js`. Please add extra defaults if needed to `config.js`. Default values should __always__ refer to local dev setups.

> __Note:__
> the `.env` file should __never__ get pushed to repository. So adding secrets and credentials to `.env` can be considered a secure option bound to specific environments.

---

## Roadmap

## Changelog

### v0.0.0

- initially bootstrapped
