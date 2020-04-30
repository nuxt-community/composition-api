// eslint-disable-next-line
const { setup } = require('@nuxtjs/module-test-utils')
// eslint-disable-next-line
const config = require('./fixture/nuxt.config')

const createServer = async () => {
  const { nuxt, builder } = await setup(config)
  await builder.build()
  nuxt.listen(3000)
  return nuxt
}

createServer()
