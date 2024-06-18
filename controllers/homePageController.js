const { Music } = require('../models')

const getStyleMusicController = async (req, res) => {
  console.log('req',req);
  const { pageNumber, pageSize } = req.body
  try {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize;
    const musics = await Music.findAll({
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']]
    });

    return res.json(musics);
  } catch (error) {
    return res.json({
      error: 'error มั้ง'
    });
  }

}
const getMusicSearchController = async (req, res) => {

  return res.send('test hhhh')
}
const getMusicIdController = async (req, res) => {

  return res.send('test hhhh')
}
const getAllArtistController = async (req, res) => {

  return res.send('test hhhh')
}
const getArtistIDController = async (req, res) => {

  return res.send('test hhhh')
}
const getArtistProfileController = async (req, res) => {

  return res.send('test hhhh')
}

module.exports = {
  getStyleMusicController,
  getMusicSearchController,
  getMusicIdController,
  getAllArtistController,
  getArtistIDController,
  getArtistProfileController
}