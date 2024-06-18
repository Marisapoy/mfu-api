module.exports = (sequelize, dataTypes) => {
  const LutMusicStyle = sequelize.define('LutMusicStyle',
    {
      name: {
        type: dataTypes.STRING(50)
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: 'lut_music_style'

    })
    LutMusicStyle.associate = models => {
      LutMusicStyle.hasMany(models.Music, { foreignKey: 'musicStyleId' })
    }
  return LutMusicStyle
}