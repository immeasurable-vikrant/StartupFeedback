const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users'); //Model Class


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
       callbackURL: '/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId:profile.id }).then((existingUser)=> {
          if(existingUser) {
            //we already have record with the given provided Id.
            done(null, existingUser);
          } else {
            // we don't have a user record with this ID, make a new record!
            new User({ googleId: profile.id})
            .save()
            .then(user => done(null, user));
          }
        })     
      }
     )
   );