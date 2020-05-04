const Product=require('../models/product')
const ShoppingCart=require('../models/shoppingCart')

//setup api
//list
module.exports.list=(req,res)=>{
    ShoppingCart.find({user: req.user._id}).populate('product',['_id','name'])
        .then((shoppingCart)=>{
            res.json(shoppingCart)
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
    const shoppingCart = new ShoppingCart(body)
    shoppingCart.user = req.user._id
    shoppingCart.save()
        .then((shoppingCart) => {
            // res.json({
            //     notice: 'successfully created a ShoppingCart', 
            //     shoppingCart
            // })
    //populating Product
    Product.findOne({_id:shoppingCart.product,user:req.user._id}, '_id name')
        .then((product)=>{
            shoppingCart.product=product
            res.json(shoppingCart)
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
    ShoppingCart.findOne({_id: id,user: req.user._id}).populate('product',['_id','name'])
        .then((shoppingCart) => {
            if (shoppingCart) {
                res.json(shoppingCart)
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
    ShoppingCart.findOneAndUpdate({_id: id,user: req.user._id}, 
        body, {new: true, runValidators: true}).populate('product',['_id','name'])
        .then((shoppingCart) => {
            if (shoppingCart) {
                res.json(shoppingCart)
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
    ShoppingCart.findOneAndDelete({_id: id,user: req.user._id})
        .then((shoppingCart) => {
            if (shoppingCart) {
                res.json(shoppingCart)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}