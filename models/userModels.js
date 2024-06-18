module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: dataTypes.STRING(50)
    },
    email: {
      type: dataTypes.STRING(100)
    },
    password: {
      type: dataTypes.STRING(100)
    },
    phone: {
      type: dataTypes.INTEGER
    },
    line: {
      type: dataTypes.INTEGER
    },
    facebook: {
      type: dataTypes.STRING(100)
    },
    image: {
      type: dataTypes.STRING(100)
    },
    description: {
      type: dataTypes.TEXT
    },
  })
  User.associate = models => {
    User.hasMany(models.Music, { foreignKey: 'ownerUserId' })
    User.hasMany(models.report, { foreignKey: 'userReportId' })
    User.hasMany(models.otp, { foreignKey: 'userId' })

  }

  return User
}