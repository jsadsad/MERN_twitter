const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

router.get('/test', (req, res) => res.json({ msg: 'This is the Users Route' }))
module.exports = router

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      //if user already exists in db
      return res
        .status(400)
        .json({ email: 'User already exists with that email.' })
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      })
      bcrypt.genSalt(10, (err, salt) => {
        //10 is the number of rounds to generate the salt. salt is the callback function after the 10.
        //second arg is the salt we get back
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //first arg is thing we want to hash, second is the salt, third is the invoked if succesful
          if (err) throw err
          newUser.password = hash //resetting password
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})
