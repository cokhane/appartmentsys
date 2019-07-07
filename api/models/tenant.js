const mongoose = require('mongoose')

const tenantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required:true },
  appartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appartment', required:true },
  name: String,
  rent:Number,
  electricity_rate:Number,
  water_rate:Number,
  start_date: Date ,
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
