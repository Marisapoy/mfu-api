module.exports = (sequelize, dataTypes) => {
  const UserManager = sequelize.define('user_manager',
    {
      name: {
        type: dataTypes.STRING(50)
      },
      email: {
        type: dataTypes.STRING(100)
      },
      password: {
        type: dataTypes.STRING(100)
      },
      isActive: {
        type: dataTypes.BOOLEAN
      },
      phone: {
        type: dataTypes.INTEGER
      },
    },
    {
      freezeTableName: true,
    }
  )
  UserManager.associate = models => {
    UserManager.belongsTo(models.LutPermission, { foreignKey: 'permissionId' })
    UserManager.hasMany(models.report, { foreignKey: 'userManagerLockId' })
    UserManager.hasMany(models.otp, { foreignKey: 'userManagerId' })
  }
  return UserManager
}