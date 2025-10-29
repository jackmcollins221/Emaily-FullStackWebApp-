

const express = require ('express');
const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express(); //calling this like a function represents a new express app.  Can have multiple in a node project, but rare

passport.use(new GoogleStrategy());


const PORT = process.env.PORT || 5000;
app.listen(PORT);