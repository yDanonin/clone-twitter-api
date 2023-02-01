const router = require('express').Router()

router.use('/user', require('./users/routes'))
router.use('/provider', require('./provider/routes'))

router.get('/test', (req, res) => {
  res.status(200).send('ta funfando')
})

module.exports = router