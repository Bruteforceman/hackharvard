const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const User = require("./user")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8888

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME;
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.cvhon.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB')
}).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('HackHarvard 2022')
})

app.listen(port, () => {
  console.log(`Website running at port ${port}`)
})

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }
))

async function main() {
  const newUser = new User({
    name: "tasmeemreza@gmail.com",
    password: "hahah"
  })
  console.log(await newUser.save())
}
// main()
