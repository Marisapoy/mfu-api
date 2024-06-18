const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/userModels');
const UserManager = require('../models/userManagerModel');
const dotenv = require('dotenv');

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('test', jwt_payload);
  User.findByPk(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => done(err, false));
}));

passport.use('userManager', new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('test', jwt_payload);
  UserManager.findByPk(jwt_payload.id)
    .then(userManager => {
      if (userManager) {
        return done(null, userManager);
      }
      return done(null, false);
    })
    .catch(err => done(err, false));
}));
