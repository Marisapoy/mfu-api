const crypto = require("crypto")

// ฟังก์ชันสำหรับสุ่มตัวอักษร 6 หลัก
function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  // ชุดตัวอักษร
  let result = '';

  // ใช้ crypto.randomInt เพื่อสุ่มค่าในช่วง 0 ถึง characters.length
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    result += characters[randomIndex];
  }

  return result;
}


module.exports = {
  generateRandomString
}