import passport from 'passport';
import User from '../models/user';
import config from '../config';

import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';

import LocalStrategy from 'passport-local';

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) { return done(err); }
    if(!user) { return done(null, false); }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

// JWT Strategy Options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), //looks at request header for a token
  secretOrKey: config.secret
};

// Create jwt strategy and see if user Id from payload exists in database.
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    //if err, call done with eror and no user
    if (err) { return done(err, false); }
    // if authenticated and yes user, call done with null error and a user
    if (user) { done(null, user); }
    // if not authenticated, but no error
    else { done(null, false); }
  })
})

passport.use(jwtLogin);
passport.use(localLogin);
