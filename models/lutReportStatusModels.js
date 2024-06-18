module.exports = (sequelize, dataTypes) => {
  const LutReportStatus = sequelize.define('lut_report_status',
    {
      name: {
        type: dataTypes.STRING(50)
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    })
    LutReportStatus.associate = models => {
      LutReportStatus.hasMany(models.report, { foreignKey: 'reportStatusId' })
    }
  return LutReportStatus
}