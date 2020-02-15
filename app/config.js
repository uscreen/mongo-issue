'use strict'

const path = require('path')
const envSchema = require('env-schema')

const schema = {
  type: 'object',
  properties: {
    httpPort: {
      default: 3000
    },
    httpBind: {
      default: '127.0.0.1'
    },
    prefix: {
      default: '/api'
    },
    logEnabled: {
      default: true
    },
    logLevel: {
      default: 'info'
    },
    mongoUri: {
      default: 'mongodb://127.0.0.1:27017/test-mongo-issue'
    }
  }
}

const config = envSchema({
  schema: schema,
  dotenv: true
})

/**
 * autoload order matters
 *
 * @see https://github.com/fastify/fastify/blob/master/docs/Getting-Started.md#loading-order-of-your-plugins
 */
config.autoloads = [
  path.join(__dirname, 'plugins'),
  path.join(__dirname, 'services'),
  path.join(__dirname, 'repositories')
]

module.exports = config
