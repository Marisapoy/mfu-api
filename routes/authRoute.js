const express = require('express')
const router = express.Router()
const routerUser = express.Router()
const routerUserManager = express.Router()
const routerOtp = express.Router()
const {
  activateUserController,
  userForgetPasswordController,
  userManagerForgetPasswordController,
  userManagerResetPasswordController,
  userRegisterController,
  userResetPasswordController,
  verifyOtpController,
  userLoginController,
  userLogoutController,
  userManagerLoginController,
  userManagerLogoutController
} = require('../controllers/authController')

// otp routing
router.use('/otp', routerOtp)
routerOtp.get('/verify/:otpCode', verifyOtpController) // เช็คว่าเป็น reset หรือ active และเช็คว่าหมดอายุหรือไม่มี 4 case can active, active expired, can reset, reset expired
routerOtp.get('/activate/:otpCode', activateUserController) // ยืนยันตัวตน

// user routing
router.use('/user', routerUser)
routerUser.post('/login', userLoginController)
routerUser.post('/logout', userLogoutController)
routerUser.post('/register', userRegisterController) // หากมี email ในระบบ ต้องทำการส่ง email activate ใหม่และอัพเดตข้อมูลเก่า แต่หากยังไม่มี user ให้สร้างใหม่และ ส่ง email activate
routerUser.post('/forget-password', userForgetPasswordController) // ส่ง email เพื่อส่งต่อ
routerUser.post('/reset-password', userResetPasswordController) // กรอกรหัสผ่านใหม่

// user-manager routing
router.use('/user-manager', routerUserManager)
routerUserManager.post('/login', userManagerLoginController)
routerUserManager.post('/logout', userManagerLogoutController)
routerUserManager.post('/forget-password', userManagerForgetPasswordController) // ส่ง email เพื่อส่งต่อ
routerUserManager.post('/reset-password', userManagerResetPasswordController) // กรอกรหัสผ่านใหม่

module.exports = router