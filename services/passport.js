const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//Model Class
const User = mongoose.model('users'); 


passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
    new GoogleStrategy(
      {
       clientID: keys.googleClientID,
       clientSecret: keys.googleClientSecret,
       callbackURL: '/auth/google/callback',
       proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId:profile.id })

        if(existingUser) {
          //we already have record with the given provided Id.
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record!
        const user = await new User({ googleId: profile.id}).save()
        done(null, user);
        }   
      }
     )
   );