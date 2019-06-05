const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  rent: Number,
  water_rate:Number,
  electricity_rate:Number,
  occupied: {
    status: {
           type: Boolean,
         },
    tenant: {
        name:{
          type: String,
          default: null
        },
        start:{
          type: String,
          default: null
        },
     },
  }
})

module.exports = mongoose.model('Room', roomSchema)
