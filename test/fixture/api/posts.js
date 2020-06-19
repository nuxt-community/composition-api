module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify({ id: req.url.split('/').slice(-1)[0] }))
}
