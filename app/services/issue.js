'use strict'

module.exports = async (fastify) => {
  const collection = fastify.mongo.db.collection('issue')

  // breaks
  // collection.createIndex({ id: 1 }, { unique: true })

  // fixes
  // await collection.createIndex({ id: 1 }, { unique: true })

  /**
   * best approach: ensure indexes... (won't create if exist)
   */
  await collection.createIndexes([
    {
      key: { id: 1 },
      unique: true
    }
  ])
}
