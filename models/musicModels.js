module.exports = (sequelize, dataTypes) => {
  const Music = sequelize.define('Music',
    {
      name: {
        type: dataTypes.STRING(50)
      },
      content: {
        type: dataTypes.TEXT
      },
      date: {
        type: dataTypes.DATE
      },
      isSold: {
        type: dataTypes.BOOLEAN
      },
      buyBy: {
        type: dataTypes.STRING(50)
      },
      price: {
        type: dataTypes.INTEGER
      },
      imageMusic: {
        type: dataTypes.STRING(200)
      },
      melody: {
        type: dataTypes.STRING(200)
      },
      isLock: {
        type: dataTypes.BOOLEAN
      },
    },
    {
      freezeTableName: true,
      tabtableName: 'Music'
    })

  Music.associate = models => {
    Music.belongsTo(models.user, { foreignKey: 'ownerUserId', })
    Music.belongsTo(models.LutMusicStyle, { foreignKey: 'musicStyleId', })
    Music.belongsTo(models.LutMusicMood, { foreignKey: 'musicMoodId', })
    Music.hasMany(models.report, { foreignKey: 'reportMusicId', })
  }

  return Music
}