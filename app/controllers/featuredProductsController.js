const Product=require('../models/product')
const FeaturedProduct=require('../models/featuredProduct')

//setup api
//list
module.exports.list=(req,res)=>{
    FeaturedProduct.find({user: req.user._id})
        .then((featuredProducts)=>{
            res.json(featuredProducts)
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
    const featuredProduct = new FeaturedProduct(body)
    featuredProduct.user = req.user._id
    featuredProduct.save()
        .then((featuredProduct) => {
            res.json({
                notice: 'successfully created a FeaturedProduct', 
                featuredProduct
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

//Show
module.exports.show = (req, res) => {
    const id = req.params.id
    FeaturedProduct.findOne({_id: id,user: req.user._id})
        .then((featuredProduct) => {
            if (featuredProduct) {
                res.json(featuredProduct)
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
    FeaturedProduct.findOneAndUpdate({_id: id,user: req.user._id}, 
        body, {new: true, runValidators: true})
        .then((featuredProduct) => {
            if (featuredProduct) {
                res.json(featuredProduct)
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
    FeaturedProduct.findOneAndDelete({_id: id,user: req.user._id})
        .then((featuredProduct) => {
            if (featuredProduct) {
                res.json(featuredProduct)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}