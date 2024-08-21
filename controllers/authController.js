const bcryptjs = require('bcryptjs')
const db = require('../models')
const jwt = require('jsonwebtoken');
const { OTP_STATUS, OTP_TYPE } = require('../constant/lut');
const moment = require('moment');
const { generateRandomString } = require('../utils/generateUtil');
const fs = require('fs');
const { sendEmailActivateResetPassword } = require('../utils/mailUtil');

//otp
const verifyOtpController = async (req, res) => {

  console.log('otpCode', req.params.otpCode);
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, [3000])
  })
  return res.status(402).send('test sss')
}

const activateUserController = async (req, res) => {
  console.log('req', req, req.params);
  return res.send()
}

//user
const userLoginController = async (req, res) => {
  const { email, password } = req.body
  const tragetUser = await db.user.findOne({ where: { email: email, isActive: true } })
  const errorMessage = { statusCode: 'USER_PASSWORD_WRONG', massage: "Username or password is wrong." }
  if (!tragetUser) {
    res.status(400).send(errorMessage)
  } else {
    const isCorrectPassword = bcryptjs.compareSync(password, tragetUser.password)
    if (isCorrectPassword) {
      const payload = {
        name: tragetUser.name,
        email: tragetUser.email,
        id: tragetUser.id,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_DATE })

      res.send({
        token: token,
        message: "Login successful."
      })
    } else {
      res.status(400).send(errorMessage)
    }
  }
}

const userLogoutController = async (req, res) => {
  // console.log('req', req, req.params);
  const otp = await db.otp.findByPk(2)
  console.log('otp', otp);
  console.log('otp', otp.expireDate);

  return res.send()
}

const userRegisterController = async (req, res) => {
  // {
  //   success : boolean
  //   errorCode: string
  //   message: string
  // }
  const { username, email, password } = req.body


  if (!email || !username || !password) {
    return res.status(400).send({ success: false, errorCode: "REQUIRE", message: "" })
  }

  const tragetUser = await db.user.findOne({ where: { email: email } })
  if (tragetUser) {
    return res.status(400).send({ success: false, errorCode: "HAVE_USER", message: "" })
  } else {
    const salt = bcryptjs.genSaltSync(12)
    const hashedPassword = bcryptjs.hashSync(password, salt)

    const user = await db.user.create({
      email: email,
      password: hashedPassword,
      username: username,
      isActive: false
    })

    const otp = await db.otp.create({
      code: generateRandomString(20),
      expireDate: moment().add(15, 'm').format("yyyy-MM-DD HH:mm:ss"),
      otpStatusId: OTP_STATUS.WAITING,
      otpTypeId: OTP_TYPE.ACTIVATE,
      userId: user.id,
    })

    // สร้าง template ส่ง mail // template = แม่แบบ ===> รูปแบบที่ต้องการส่งข้อมูล
    let template = await fs.promises.readFile(`./template-mail/user-activate.html`, 'utf8');
    const link = process.env.MFU_WEB + "/verify/" + otp.code
    template = template.replace('{{otp}}', otp.code);
    template = template.replace('{{link}}', link);
    // ส่ง mail
    await sendEmailActivateResetPassword(user.email, {
      title: "ยืนยันตัวตน บัญชี MFU.",
      body: template
    })
    res.status(201).send({ success: true, errorCode: "", message: "" })
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