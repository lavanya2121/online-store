const mongoose=require('mongoose')
const Schema=mongoose.Schema

const featuredproductSchema=new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }

})

const FeaturedProduct = mongoose.model('FeaturedProduct', featuredproductSchema)

module.exports = FeaturedProduct