const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Room = require('../models/room')
const Tenant = require('../models/tenant')
const Appartment = require('../models/appartment')


router.get('/', (req,res,next) => {
  User.find()
  .populate('room','name rent')
  .exec()
  .then(docs => {
    console.log(docs)
    const response = {
      count:docs.length,
      userInfo: docs.map(item => {
          return{
            name:item.name,
            start_date: convertDate(item.start_date),
            _id:item._id,
            deposit:item.deposit,
            roomInfo:item.room
          }
        })
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
  Appartment.findById(req.body.appartment_id)
  .exec()
  .then(appartment =>{
    if(!appartment){
      return res.status(404).json({
        message: 'Appartment ID not found'
      })
    }
    return Room.findById(req.body.room_id)
    .exec()
    .then(room => {
      if(!room){
        return res.status(404).json({
          message: 'Room ID not found'
        })
      }

      const tenants = new Tenant({
        _id:mongoose.Types.ObjectId(),
        room_id: req.body.room_id,
        appartment_id: req.body.appartment_id,
        name: req.body.name,
        rent:req.body.rent,
        water_rate:req.body.water_rate,
        electricity_rate:req.body.electricity_rate,
        start_date: req.body.start_date
      })

       return tenants.save()
    })


    })

    .then(result => {
      console.log('result: ',result)
        res.status(201).json({
          message:'Tenants Registered',
          user:result
          // user:{
          //   _id: result._id,
          //   room: result.room,
          //   name: result.name,
          //   start_date:result.start_date,
          //   deposit:result.deposit
          // },
          // request:{
          //     type: 'GET',
          //     url: 'http://localhost:3000/users/' + result._id
          // }
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error:err
        })
      })
})


// ------------------------------------------------------- NEW WORK


router.post('/signup', (req, res, next) => {
  User.find({email:req.body.email})
  .exec()
  .then(user => {
    if(user.length >= 1){
      return res.status(409).json({
        message:'Mail exists'
      })
    }else{
      bcrypt.hash(req.body.password, 10, (err, hash) => {
       if(err){
         console.log('true')
         return res.status(500).json({
           error:err
         })
       }else{
         const user = new User({
           _id: new mongoose.Types.ObjectId(),
           email: req.body.email,
           password: hash
         })
         user.save()
         .then(result => {
           console.log(result)
           res.status(201).json({
             message:'User Created Successfully'
           })
         }).catch(err => {
           res.status(500).json({
             error:err
           })
         })

       }
     })
    }
  })
  })





  router.post('/login', (req,res,next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
      if(user.length < 1){
        return res.status(404).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password,user[0].password, (err,result) => {
        if(err){
          return res.status(404).json({
            message: 'Auth failed'
          })
        }
        if(result){
          const token = jwt.sign({
            email:user[0].email,
            userId: user[0]._id
          },process.env.JWT_KEY,{
            expiresIn:"1h"
          })

          return res.status(200).json({
            message: 'Auth Successfully',
            token:token
          })
        }
        res.status(401).json({
            message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error:err
      })
    })
  })

  router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId
    User.deleteOne({ _id:id })
      .exec()
      .then(result => {
        res.status(200).json({
          message:"Delete Success!",
          request:{
            type: 'POST',
            url: 'http://localhost:4000/users/',
            body: {name: 'String', price: 'Number'}
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

  // router.delete('/:userId', (req, res, next) => {
  //   User.deleteOne({_id: req.params.userId})
  //   .exec()
  //   .then(result => {
  //     console.log(result)
  //     result.status(200).json({
  //       message: "User deleted"
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error:err
  //     })
  //   })
  // })

  const convertDate = (e) => {
    var d = new Date(e),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    today = '' + d.getDay().toString();
    var thisDay = "";
    if(today == "1" ){
      thisDay = "Mon"
    }else if(today == "2"){
      thisDay = "Tue"
    }else if(today == "3"){
      thisDay = "Wed"
    }else if(today == "4"){
      thisDay = "Thur"
    }else if(today == "5"){
      thisDay = "Fri"
    }else if(today == "6"){
      thisDay = "Sat"
    }else{
      thisDay = "Sun"
    }
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return month + "-"+ day + "-"+ year;

  }




module.exports = router;
