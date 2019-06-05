const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Appartment = require('../models/appartment')

router.get('/', (req,res,next) => {
  Appartment.find()
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
    const appartment = new Appartment({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      address:{
        city:req.body.address.city,
        street:req.body.address.street,
        zipcode:req.body.address.zipCode,
      }
    })
    console.log('\n')
    console.log('appartment: ',appartment)
    console.log('\n')

    appartment.save()
    .then(result => {
        res.status(201).json({
            message:'Appartment Registered',
            user:result
        })
        //   message:'User Registered',
        //   user:{
        //     _id: result._id,
        //     address: result.address,
        //     name: result.name,
        //     owner:result.owner,
        //   },
        //   request:{
        //       type: 'GET',
        //       url: 'http://localhost:3000/users/' + result._id
        //   }
        // })

      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error:err
        })
      })
})


// ------------------------------------------------------- NEW WORK







module.exports = router;
