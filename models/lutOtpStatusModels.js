module.exports = (sequelize, dataTypes) => {
  const LutOtpStatus = sequelize.define('lutOtpStatus',
    {
      name: {
        type: dataTypes.STRING(50)
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: 'lut_otp_status'
    })
    LutOtpStatus.associate = models => {
      LutOtpStatus.hasMany(models.otp, { foreignKey: 'otpStatusId' })
    }
  return LutOtpStatus
}