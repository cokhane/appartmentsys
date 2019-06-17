const mongoose = require('mongoose')

const tenantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required:true },
  water_rate:Number,
  electricity_rate:Number,
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

module.exports = mongoose.model('Tenant', tenantSchema)
