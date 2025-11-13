const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users"); // this tell it hey use the user.js file as the schema. 1 arg means use something from it, 2 args means add it to mongoose

/**
 * takes user model and done as arguments.
 * In this case user is the user model from the big passport.use below
 * add identifying info to cookie
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Removes identifying info from cookie
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", //this was relative at some point and it caused problems with oauth because it became http
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //this function is called whenver a user is redireted back to my project
      console.log(`accessToken ${accessToken}`);
      console.log(`refresh token ${refreshToken}`);
      console.log(`profile ${JSON.stringify(profile, null, 2)}`); //this line and access token and refresh could be deleted, but im not gonna

      //before adding new user search to see if they exists
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        //runs after searching.  Existing user is either null or it finds an exsiting one.
        if (existingUser) {
          //record exists
          console.log("user already exists");
          done(null, existingUser); //tells passport we are done
        } else {
          //save the new user.
          new User({ googleID: profile.id })
            .save() // says hey make me a user with googleID = the google profile ID
            .then((user) => done(null, user));

          console.log("created user");
        }
      });
    }
  )
);
