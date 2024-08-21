const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });
require('./config/passport')
const fs = require('fs');

const express = require('express');
const passport = require('passport')
const cors = require('cors');

const db = require('./models');
const homePageRoute = require('./routes/homePageRoute')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const userManagerRoute = require('./routes/userManager');
const { generateRandomString } = require('./utils/generateUtil');
const { sendEmailActivateResetPassword } = require('./utils/mailUtil');

const userAuthentication = passport.authenticate('user', { session: false })
const userManagerAuthentication = passport.authenticate('userManager', { session: false })

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use('/homepage', homePageRoute)
app.use('/auth', authRoute)
app.use('/user', userAuthentication, userRoute)
app.use('/user-manager', userManagerAuthentication, userManagerRoute)

app.get('/test', async (req, res) => {
  // สร้าง template ส่ง mail // template = แม่แบบ ===> รูปแบบที่ต้องการส่งข้อมูล
  const otp = generateRandomString(20)
  const template = await new Promise((resolve, reject) => {
    fs.readFile('./template-mail/user-activate.html', 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

  let templateReplace = template.replace('{{otp}}', otp);
  templateReplace = templateReplace.replace('{{link}}', "http://localhost:5000/test-2?otp=" + otp);

  sendEmailActivateResetPassword("sompor222@gmail.com", {
    title: "test",
    body: templateReplace
  })
  res.json({
    status: true,
    code: otp
  })
})

db.sequelize.sync({ alter: false }).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  })
})




