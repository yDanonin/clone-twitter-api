const router = require('express').Router()

router.get('/test', (req, res) => {
  res.status(200).send('ta funfando')
})

module.exports = router