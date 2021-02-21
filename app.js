const express = require('express')
const app = express()
const db = require('./config/keys').mongoURI
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
// we can parse the JSON we send to our frontend
// body parser tells our app what source of requests it should respond to

const users = require('./routes/api/users')
const tweets = require('./routes/api/tweets')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//20-25 tells our that we want it to respond to JSON requests.
// urlencoded allows app to take requests from postman

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('Mongo Express React NodeJS'))

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/tweets', tweets)

const port = process.env.PORT || 5000 // Locally our server will now run on localhost:5000
app.listen(port, () => console.log(`Server is running on port ${port}`))
