const Product=require('../models/product')
const ShoppingCart=require('../models/shoppingCart')
const Order=require('../models/order')

//setup api
//list
module.exports.list=(req,res)=>{
    Order.find({user: req.user._id}).populate('product',['_id','name'])
        .then((orders)=>{
            res.json(orders)
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
    const order = new Order(body)
    order.user = req.user._id
    order.save()
        .then((order) => {
            // res.json({
            //     notice: 'successfully created a Orders', 
            //     order
            // })
     //populating Product
     Product.findOne({_id:order.product,user:req.user._id}, '_id name')
     .then((product)=>{
        order.product=product
         res.json(order)
     })
     .catch((err) => {
         res.json(err)
     })
    //populating Orders
    Order.findOne({_id:order.product,user:req.user._id}, '_id name')
    .then((product)=>{
        order.product=product
        res.json(order)
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
    Order.findOne({_id: id,user: req.user._id}).populate('product',['_id','name'])
        .then((order) => {
            if (order) {
                res.json(order)
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
    Order.findOneAndUpdate({_id: id,user: req.user._id}, 
        body, {new: true, runValidators: true}).populate('product',['_id','name'])
        .then((order) => {
            if (order) {
                res.json(order)
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
    Order.findOneAndDelete({_id: id,user: req.user._id})
        .then((order) => {
            if (order) {
                res.json(order)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}