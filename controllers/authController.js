const bcryptjs = require('bcryptjs')
const db = require('../models')
const jwt = require('jsonwebtoken')

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
  const { email, password } = req.body
  const tragetUser = await db.user.findOne({ where: { email: email } })
  if (!tragetUser) {
    res.status(400).send({ massage: "Username or password is wrong." })
  } else {
    const isCorrectPassword = bcryptjs.compareSync(password, tragetUser.password)
    if (isCorrectPassword) {
      const payload = {
        name: tragetUser.name,
        email: tragetUser.email,
        id: tragetUser.id,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 })

      res.send({
        token: token,
        message: "Login successful."
      })
    } else {
      res.status(400).send({ massage: "Username or password is wrong." })
    }
  }
}

const userLogoutController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

const userRegisterController = async (req, res) => {
  const { username, email, password } = req.body
  const tragetUser = await db.user.findOne({ where: { email: email } })
  if (tragetUser) {
    res.status(400).send({ message: "Username already taken." })
  } else {
    const salt = bcryptjs.genSaltSync(12)
    const hashedPassword = bcryptjs.hashSync(password, salt)

    await db.user.create({
      email: email,
      password: hashedPassword,
      username: username
    })
    res.status(201).send({ massage: "User created" })
  }
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