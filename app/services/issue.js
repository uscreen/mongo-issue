'use strict'

module.exports = async fastify => {
  const collection = fastify.mongo.db.collection('issue')

  // breaks
  // collection.createIndex({ id: 1 }, { unique: true })

  // fixes
  await collection.createIndex({ id: 1 }, { unique: true })
}
