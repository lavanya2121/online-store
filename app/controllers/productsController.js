const Product=require('../models/product')

//setup api
//list
module.exports.list=(req,res)=>{
    Product.find({user: req.user._id})
        .then((products)=>{
            res.json(products)
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
    const product = new Product(body)
    product.user = req.user._id
    product.save()
        .then((product) => {
            res.json({
                notice: 'successfully created a Product', 
                product
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

//Show
module.exports.show = (req, res) => {
    const id = req.params.id
    Product.findOne({_id: id,user: req.user._id})
        .then((product) => {
            if (product) {
                res.json(product)
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
    Product.findOneAndUpdate({_id: id,user: req.user._id}, 
        body, {new: true, runValidators: true})
        .then((product) => {
            if (product) {
                res.json(product)
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
    Product.findOneAndDelete({_id: id,user: req.user._id})
        .then((product) => {
            if (product) {
                res.json(product)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}