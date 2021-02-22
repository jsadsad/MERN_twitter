const JwtStrategy = require('passport-jwt').Strategy //this tells passport we want to use strategy for handling json web tokens.
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('./keys')

// Passport is a Node.js middleware that offers a variety of different request authentication strategies that are easy to implement. By default, it stores the user object in session.

//jwt = json web token
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() //built in method from jwt. extract the bearer token.
options.secretOrKey = keys.secretOrKey //from key.js

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      //done is a keyword to allow next middleware to take action. Similar to next but has a bit extra functionality.
      // console.log(jwt_payload)
      // done()
      User.findById(jwt_payload.id) //without this, tweet will not post. Wil reach an "unauthorized"
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
