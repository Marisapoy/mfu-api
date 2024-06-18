const db = require('../models')

//otp
const verifyOtpController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send('test sss')
}

const activateUserController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

//user
const userLoginController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userLogoutController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userRegisterController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userForgetPasswordController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userResetPasswordController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}


//user manager
const userManagerLoginController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userManagerLogoutController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userManagerForgetPasswordController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userManagerResetPasswordController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

module.exports = {
  userLoginController,
  userLogoutController,
  userManagerLoginController,
  userManagerLogoutController,
  verifyOtpController,
  activateUserController,
  userRegisterController,
  userForgetPasswordController,
  userResetPasswordController,
  userManagerForgetPasswordController,
  userManagerResetPasswordController
}