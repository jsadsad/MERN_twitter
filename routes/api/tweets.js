const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Tweet = require('../../models/Tweet')
const validateTweetInput = require('../../validation/tweets')

router.get('/', (req, res) => {
  Tweet.find() //we don't add passport authenticate because it doesn't matter which user we're logging in with for this particular route
    .sort({ date: -1 }) // newest first
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(400).json({ notweetsfound: 'No tweets found' }))
})

router.get('/user/:user_id', (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(400).json(err))
})

router.get('/:id', (req, res) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.json(tweet))
    .catch((err) => res.status(400).json(err))
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
