module.exports = (sequelize, dataTypes) => {
  const LutMusicMood = sequelize.define('LutMusicMood',
    {
      name: {
        type: dataTypes.STRING(50)
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: 'lut_music_mood'
    })
  LutMusicMood.associate = models => {
    LutMusicMood.hasMany(models.Music, { foreignKey: 'musicMoodId' })
  }
  return LutMusicMood
}