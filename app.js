const express = require('express')
const app = express()
const db = require('./config/keys').mongoURI
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// we can parse the JSON we send to our frontend
// body parser tells our app what source of requests it should respond to

const users = require('./routes/api/users')
const tweets = require('./routes/api/tweets')

const User = require('./models/User')

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err))
mongoose.set('useNewUrlParser', true)

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())
//20-25 tells our app tghat we want it to respond to JSON requests.
// urlencoded allows app to take requests from postman

app.get('/', (req, res) => {
  const user = new User({
    handle: 'josh',
    email: 'test@example.com',
    password: '123456',
  })
  user.save()
  res.send('Twitter MERN')
})
app.use('/api/users', users)
app.use('/api/tweets', tweets)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000 // Locally our server will now run on localhost:5000
app.listen(port, () => console.log(`Server is running on port ${port}`))
