const tap = require('tap')
const { build } = require('./helper')

tap.test('Test Setup', (t) => {
  t.equal(true, true, 'Tests and assertions should work')
  t.end()
})

tap.test('Noop Service', async (t) => {
  const fastify = build(t)
  await fastify.ready()

  t.test('a valid GET Request', (t) => {
    fastify.inject(
      {
        method: 'GET',
        url: '/api/noop'
      },
      (e, response) => {
        t.error(e)
        t.same(response.statusCode, 200, 'response ok')
        t.same(
          JSON.parse(response.body),
          {
            noop: 'Hello world',
            plugin: 'Hello Universe'
          },
          'payload ok'
        )
        t.end()
      }
    )
  })
})
