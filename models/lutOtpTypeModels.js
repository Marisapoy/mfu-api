module.exports = (sequelize, dataTypes) => {
  const LutOtpType = sequelize.define('LutOtpType',
    {
      name: {
        type: dataTypes.STRING(50)
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: 'lut_otp_type'
    })
  LutOtpType.associate = models => {
    LutOtpType.hasMany(models.otp, { foreignKey: 'otpTypeId' })
  }
  return LutOtpType
}