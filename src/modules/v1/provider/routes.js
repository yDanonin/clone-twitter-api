const router = require('express').Router()
const createHttpError = require('http-errors')
const service = require('./provider-service')

router.get('/', (req, res, next) => {
  service.getApiKeys()
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

module.exports = router
