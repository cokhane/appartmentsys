const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Owner = require('../models/owner')

router.get('/', (req,res,next) => {
  Owner.find()
  .exec()
  .then(docs => {
    const response = {
      count:docs.length,
      userInfo: docs

      //  docs.map(item => {
      //     return{
      //       name:item.name,
      //       start_date: convertDate(item.start_date),
      //       _id:item._id,
      //       deposit:item.deposit,
      //       roomInfo:item.room
      //     }
      //   })
      }

    if(docs.length > 0){
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



router.post('/', async (req, res, next) => {
  console.log(req.body.address)
    const owner = new Owner({
      _id: new mongoose.Types.ObjectId(),
      appartment_id:req.body.appartmentID,
      name: req.body.name,
      date:{
        start_date:req.body.date.startDate,
        end_date:req.body.date.endDate
      },
      email: req.body.email,
      password: req.body.password,
      address:{
        city:req.body.address.city,
        street:req.body.address.street,
        zipcode:req.body.address.zipCode,
      }
    })
    console.log('\n')
    console.log('owner: ',owner)
    console.log('\n')

    owner.save()
    .then(result => {
        res.status(201).json({
            message:'Owner Registered',
            user:result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error:err.message
        })
      })
})


// ------------------------------------------------------- NEW WORK







module.exports = router;
