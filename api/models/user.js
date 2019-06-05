const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required:true },
  name: String,
  start_date:  Date ,

  deposit: {
      rent: {
        type: Number,
        default: null
      },
      water_and_electricity: {
        type: Number,
        default: null
      }
  },
})

module.exports = mongoose.model('User', userSchema)
