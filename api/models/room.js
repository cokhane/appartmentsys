const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  appartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appartment', required:true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', default: null },
  name: String,
  is_occupied: {
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
