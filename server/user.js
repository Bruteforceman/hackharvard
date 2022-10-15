const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  university: { type: String }
})

module.exports = mongoose.model("user", UserSchema)
