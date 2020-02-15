'use strict'

const fs = require('fs')
const autoload = require('fastify-autoload')
const fp = require('fastify-plugin')
const schemas = require('./schemas')

module.exports = fp(async (fastify, opts, next) => {
  /**
   * add schemas
   */
  fastify.register(schemas)

  /**
   * autoload plugins, services, etc
   */
  for (const dir of opts.autoloads) {
    if (fs.existsSync(dir))
      fastify.register(autoload, {
        dir,
        options: opts
      })
  }

  next()
})
