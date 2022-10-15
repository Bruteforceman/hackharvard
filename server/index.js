const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8888

app.get('/', (req, res) => {
  res.send('HackHarvard 2022')
})

app.listen(port, () => {
  console.log(`Website running at port ${port}`)
})



