const express = require('express')
const passport = require('passport')
const router = express.Router()

const userAuthentication = passport.authenticate('user', { session: false })

router.get('/test', (req, res) => {
  return res.send('ได้นะ')
})


module.exports = router