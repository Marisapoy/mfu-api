module.exports = (sequelize, dataTypes) => {
  const Otp = sequelize.define('otp',
    {
      code: {
        type: dataTypes.STRING(200)
      },
      expireDate: {
        type: dataTypes.DATE
      },
    },
    {
      freezeTableName: true,
    })

  Otp.associate = models => {
    Otp.belongsTo(models.user_manager, { foreignKey: 'userManagerId' })
    Otp.belongsTo(models.user, { foreignKey: 'userId' })
    Otp.belongsTo(models.LutOtpType, { foreignKey: 'otpTypeId' })
    Otp.belongsTo(models.lutOtpStatus, { foreignKey: 'otpStatusId' })
  }
  return Otp
}