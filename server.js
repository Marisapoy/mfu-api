const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });

const express = require('express');
const db = require('./models');
const homePageRoute = require('./routes/homePageRoute')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const userManagerRoute = require('./routes/userManager')

const app = express()

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use('/api/homepage', homePageRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute) //ต้องมี auth
app.use('/api/user-manager', userManagerRoute) //ต้องมี auth

db.sequelize.sync({ alter: true }).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  })
})




