const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  //define what it means to be a user
  handle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('users', UserSchema)
module.exports = User
