
const OTP_TYPE = {
  ACTIVATE: 1,
  RESET_PASSWORD: 2
}

const OTP_STATUS = {
  WAITING: 1,
  EXPIRED: 2,
  SUCCESS: 3
}

module.exports = {
  OTP_TYPE,
  OTP_STATUS
}