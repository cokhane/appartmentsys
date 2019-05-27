const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required:true },
  name: 'String',
  start_date: { type: Date, default: Date.now },
  deposit: {
      rent: {
        type: Number,
        default: 0
      },
      water_and_electricity: {
        type: Number,
        default: 0
      }
    },
  end_date:{
    last_day:{
        type: Date,
         default: Date.now
    },
    status:{
      
    }
   }

})

module.exports = mongoose.model('User', userSchema)
