const express = require('express')
const router = express.Router()
const {
  getAllArtistController,
  getArtistIDController,
  getArtistProfileController,
  getMusicIdController,
  getMusicSearchController,
  getStyleMusicController
} = require('../controllers/homePageController')

router.post('/music/style-music/:styleMusic', getStyleMusicController)
router.post('/music/music/search', getMusicSearchController)
router.post('/music/music/musicId', getMusicIdController)
router.post('/music/artist/search', getAllArtistController)
router.post('/music/artist/artistID', getArtistIDController)
router.get('/music/artist/artistProfile', getArtistProfileController)

module.exports = router