const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');
const UserManager = require('../models/userManagerModel');
const dotenv = require('dotenv');

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use('user', new JwtStrategy(opts, (jwt_payload, done) => {
  db.user.findByPk(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done({message: 'un'}, false);
    })
    .catch(err => done(err, false));
}));

passport.use('userManager', new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('test', jwt_payload);
  db.user_manager.findByPk(jwt_payload.id)
    .then(userManager => {
      if (userManager) {
        return done(null, userManager);
      }
      return done(null, false);
    })
    .catch(err => done(err, false));
}));
