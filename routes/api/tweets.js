const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Tweet = require('../../models/Tweet')
const validateTweetInput = require('../../validation/tweets')

router.get('/', (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(404).json({ notweetsfound: 'No tweets found' }))
})

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newTweet = new Tweet({
      text: req.body.text,
      user: req.user.id,
    })

    newTweet.save().then((tweet) => res.json(tweet))
  }
)

module.exports = router
