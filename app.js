const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const database = require('./database');


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')
const roomRoutes = require('./api/routes/rooms')
const appartmentRoutes = require('./api/routes/appartments')

// mongoose.connect('localhost:27017')



// for db connection

console.log('\n')
console.log('\n')
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' )

  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({
    })
  }
  next()
})


//Routes which should handle request
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/users',userRoutes)
app.use('/rooms',roomRoutes)
app.use('/appartments',appartmentRoutes)

app.use((req,res,next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;


//sky.ahmad1994@gmail
//@tatae123
