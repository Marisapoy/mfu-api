const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  return res.send('ได้นะ')
})


module.exports = router