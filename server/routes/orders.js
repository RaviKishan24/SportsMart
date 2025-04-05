const express=require('express')
const { placeOrder } = require('../Controller/user')
const orderRouter=express.Router()

orderRouter.post("/",placeOrder)

module.exports={orderRouter}