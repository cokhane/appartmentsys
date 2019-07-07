const express = require('express');
const router = express.Router();
const Room = require('../models/room')
const Appartment = require('../models/appartment')
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
          isOccupied: {
            tenant:{
              name:item.is_occupied.tenant.name,
              start:item.is_occupied.tenant.start,
            },
            status: item.is_occupied.status,
          }
          // request : {
          //   type: 'GET',
          //   url: 'http://localhost:4000/rooms/' + item._id
          // }
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
    Appartment.findById(req.body.appartment_id)
    .exec()
    .then(appartment_id =>{
      if(!appartment_id){
        return res.status(404).json({
          message: 'Appartment ID not found'
        })
      }

      const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        appartment_id:req.body.appartment_id,
        is_occupied:{
          status:req.body.isOccupied.status
        }
      })
      return room.save()

    })
    .then(result => {
      console.log('result', result)
      res.status(201).json({
        message:'Room Created successfully',
        createdRoom: {
          _id:result._id,
          appartment_id:result.appartment_id,
          name:result.name,
          isOccupied: {
            tenant:{
              name:result.is_occupied.tenant.name,
              start:result.is_occupied.tenant.start,
            },
            status: result.is_occupied.status,
          }
          // request:{
          //   type: 'POST',
          //   url: 'http://localhost:4000/rooms/' + result._id
          // }
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
