module.exports = (sequelize, dataTypes) => {
  const LutPermission = sequelize.define('LutPermission',
    {
      name: {
        type: dataTypes.STRING(50)
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: 'lut_permission'
    })

  LutPermission.associate = models => {
    LutPermission.hasMany(models.user_manager, { foreignKey: 'permissionId' })
  }
  return LutPermission
}