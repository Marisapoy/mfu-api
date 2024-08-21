const nodemailer = require("nodemailer")

// ฟังก์ชันสำหรับส่ง OTP ผ่านอีเมล
async function sendEmailActivateResetPassword(email, details) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // ใช้ Gmail ในการส่งอีเมล (เปลี่ยนได้ตามความต้องการ)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    to: email,
    subject: details.title,
    html: details.body
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmailActivateResetPassword
}