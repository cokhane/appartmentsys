const express = require('express');
const router = express.Router();
const Room = require('../models/room')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')



router.get('/', (req,res,next) => {
  Room.find().sort({ name:1})
  .then(result => {
    console.log(result)
    const response = {
      count:result.length,
      rooms: result.map(item => {
        return{
          _id:item._id,
          name:item.name,
          rent:item.rent,
          waterRate:item.water_rate,
          electricity_rate: item.electricity_rate,
          occupied: item.occupied,
          request : {
            type: 'GET',
            url: 'http://localhost:4000/rooms/' + item._id
          }
        }
      })
    }

    if(result.length > 0){
      res.status(200).json(response)
    }else{
      res.status(404).json({
        message: 'No entries found'
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})


router.post('/',  (req, res, next) => {
    const room = new Room({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      rent: req.body.rent,
      water_rate: req.body.waterRate,
      electricity_rate: req.body.electricityRate,
      occupied: req.body.occupied,

    })
    room.save()
    .then(result => {
      console.log('result: ', result)
      res.status(201).json({
        message:'Room Created successfully',
        createdRoom: {
          _id:result._id,
          name:result.name,
          rent:result.rent,
          waterRate:result.water_rate,
          electricity_rate: result.electricity_rate,
          occupied: result.occupied,
          request:{
            type: 'POST',
            url: 'http://localhost:4000/rooms/' + result._id
          }
        }
      })
    })
    .catch(err => {
       console.log(err)
       res.status(500).json({
         error:err
       })
    })

})




module.exports  = router
