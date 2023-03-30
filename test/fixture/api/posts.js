/** @type {import('@nuxt/types').ServerMiddleware} */
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ id: req.url?.split('/').slice(-1)[0] }))
}
