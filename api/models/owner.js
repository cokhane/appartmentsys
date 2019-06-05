const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  appartment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appartment', required:true },
  name: String,
  date:{
    start_date: Date,
    end_date: Date,
  },
  email: { type: String,
      required: true,
       match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
     },
 password: {type: String, required: true},
 address:{
    city: {type:String, default:null},
    street:{type:String, default:null},
    zipcode:Number,
  }
})

module.exports = mongoose.model('Owner', ownerSchema)
