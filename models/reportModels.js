module.exports = (sequelize, dataTypes) => {
  const Report = sequelize.define('report',
    {
      dateReport: {
        type: dataTypes.DATE
      },
      remark: {
        type: dataTypes.STRING(200)
      },
      premise: {
        type: dataTypes.STRING(200)
      },
    },
    {
      freezeTableName: true,
    })
    Report.associate = models => {
      Report.belongsTo(models.Music, { foreignKey: 'reportMusicId' })
      Report.belongsTo(models.user_manager, { foreignKey: 'userManagerLockId' })
      Report.belongsTo(models.user, { foreignKey: 'userReportId' })
      Report.belongsTo(models.lut_report_status, { foreignKey: 'reportStatusId' })
    }
  return Report
}