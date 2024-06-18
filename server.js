const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });
require('./config/passport')

const express = require('express');
const passport = require('passport')
const db = require('./models');
const homePageRoute = require('./routes/homePageRoute')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const userManagerRoute = require('./routes/userManager')

const userAuthentication = passport.authenticate('jwt', { session: false })
const userManagerAuthentication = passport.authenticate('userManager', { session: false })

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize())

app.use('/api/homepage', homePageRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userAuthentication, userRoute)
app.use('/api/user-manager', userManagerAuthentication, userManagerRoute)

db.sequelize.sync({ alter: false }).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  })
})




