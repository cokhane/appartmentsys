const mongoose = require('mongoose')

const appartmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  Address:  Date
})

module.exports = mongoose.model('Appartment', appartmentSchema)
