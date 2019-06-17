const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required:true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', default: null },
  name: String,
  rent: Number,
  occupied: {
    status: {
           type: Boolean,
         }
    // tenant: {
    //     name:{
    //       type: String,
    //       default: null
    //     },
    //     start:{
    //       type: String,
    //       default: null
    //     },
    //  },
  }
})

module.exports = mongoose.model('Room', roomSchema)
