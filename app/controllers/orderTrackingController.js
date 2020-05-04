const Product=require('../models/product')
const ShoppingCart=require('../models/shoppingCart')
const Order=require('../models/order')
const OrderTracking=require('../models/orderTracking')

//setup api
//list
module.exports.list=(req,res)=>{
    OrderTracking.find({user: req.user._id}).populate('product',['_id','name'])
        .then((ordersTracking)=>{
            res.json(ordersTracking)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//Create
module.exports.create = (req, res) => {
    const body = req.body
    if (req.file) {
        const file = req.file
        body.photoPath = file.location
    }
    const orderTracking = new OrderTracking(body)
    orderTracking.user = req.user._id
    orderTracking.save()
        .then((orderTracking) => {
            // res.json({
            //     notice: 'successfully created a Orders', 
            //     order
            // })
     //populating Product
     Product.findOne({_id:orderTracking.product,user:req.user._id}, '_id name')
     .then((product)=>{
        orderTracking.product=product
         res.json(orderTracking)
     })
     .catch((err) => {
         res.json(err)
     })
    //populating Orders
    Order.findOne({_id:orderTracking.product,user:req.user._id}, '_id name')
    .then((product)=>{
        orderTracking.product=product
        res.json(orderTracking)
    })
    .catch((err) => {
        res.json(err)
    })
        })
        .catch((err) => {
            res.json(err)
        })
}

//Show
module.exports.show = (req, res) => {
    const id = req.params.id
    OrderTracking.findOne({_id: id,user: req.user._id}).populate('product',['_id','name'])
        .then((orderTracking) => {
            if (orderTracking) {
                res.json(orderTracking)
            } 
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//Update/Edit
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    OrderTracking.findOneAndUpdate({_id: id,user: req.user._id}, 
        body, {new: true, runValidators: true}).populate('product',['_id','name'])
        .then((orderTracking) => {
            if (orderTracking) {
                res.json(orderTracking)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//Delete
module.exports.destroy = (req, res) => {
    const id = req.params.id
    OrderTracking.findOneAndDelete({_id: id,user: req.user._id})
        .then((orderTracking) => {
            if (orderTracking) {
                res.json(orderTracking)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}