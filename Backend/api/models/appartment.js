const mongoose = require('mongoose')

const appartmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  address:{
    city: {type:String, default:null},
    street:{type:String, default:null},
    zipcode:Number,
  }
})

module.exports = mongoose.model('Appartment', appartmentSchema)
