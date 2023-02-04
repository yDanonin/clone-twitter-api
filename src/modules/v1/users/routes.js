const router = require('express').Router()
const createHttpError = require('http-errors')
const service = require('./user-service')

router.post('/', (req, res, next) => {
  service.createUser(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

router.get('/', (req, res, next) => {
  service.getAllUsers()
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

router.get('/:nameTag', (req, res, next) => {
  service.getUserByNameTag(req.params.nameTag)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      const httpError = createHttpError(e)
      next(httpError)
    })
})

module.exports = router
