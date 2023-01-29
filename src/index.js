require('dotenv').config()
const express = require('express')
const app = express()
const {logger, httpFileTransports} = require('./utils/logger')
const expressWinston = require('express-winston')
const createHttpError = require('http-errors')


const { getProviderByApiKey } = require('./repository/provider')

const port = process.env.PORT || 3001

app.use(express.json({limit: '100mb'}))

app.use(expressWinston.logger({
  transports: [
    httpFileTransports
  ],
  meta: true,
  msg: 'HTTP {{res.statusCode}} {{res.responseTime}}ms {{req.method}} {{req.url}}',
}))

const _api_key_http_error = createHttpError(401, 'Invalid API_KEY')
app.use((req, res, next) => {
  if(!req.url.startsWith('/api/')) return next()
  const _authorization = req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : null
  if (!_authorization) return next(_api_key_http_error)
  getProviderByApiKey(_authorization)
    .then(provider => {
      if(!provider) return next(_api_key_http_error)
      return next()
    })
    .catch(e => {
      return next(e)
    })

})

app.get('/', (req, res) => {
  res.send('Live long and prosper 🖖')
})

app.use(express.json())

const versions = ['v1']
versions.forEach(version => {
  app.use(`/api/${version}`, require(`./modules/${version}/routes.js`))
})



app.listen(port, () => {
  logger.info(`🚀 Server running at http://localhost:${port}`)
})