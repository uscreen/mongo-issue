'use strict'

const fp = require('fastify-plugin')
const mongodb = require('fastify-mongodb')

module.exports = fp(
  async (fastify, opts, next) => {
    await fastify.register(mongodb, {
      url: opts.mongoUri
    })

    next()
  },
  {
    name: 'mongo'
  }
)
