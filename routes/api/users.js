const express = require('express')
const router = express.Router()
const User = require('../../models/User')

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
      newUser
        .save()
        .then((user) => res.send(user))
        .catch((err) => res.send(err))
    }
  })
})
