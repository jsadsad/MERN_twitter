//think of this as a route file that holds our controllers

const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validateRegisterInput = require('../../validation/register')
const validLoginInput = require('../../validation/login')

router.get('/test', (req, res) => res.json({ msg: 'This is the Users Route' }))
module.exports = router

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
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

router.post('/login', (req, res) => {
  //this checks if email or password match a user in the db
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then((user) => {
    //findOne just returns one obj.
    if (!user) {
      return res.status(404).json({ email: 'This user does not exist' })
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          //we send this payload back
          id: user.id, //this is the mongo db id
          handle: user.handle,
          email: user.email,
        }
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              //user can remain logged in(session_token)
              success: true,
              token: 'Bearer ' + token,
            })
          }
        )
      } else {
        return res.status(400).json({ password: 'Incorrect Password' })
      }
    })
  })
})

module.exports = router
