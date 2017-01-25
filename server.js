const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');

const config = require('./config.json');

const app = express();
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// FacebookStrategy

passport.use('facebook', new FacebookStrategy ({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL:'http://localhost:3000/auth/facebook/callback',
  profileFields:[]
},(accessToken,refreashToken, profile, done) =>{
  // Access the database

  done(null, profile);
}));

passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.status(200).send(req.user);
});



app.listen(config.port, function () {
  console.log('running on ' + config.port);
});
