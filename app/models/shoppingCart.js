const mongoose=require('mongoose')
const Schema=mongoose.Schema

const shoppingCartSchema=new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    product:[{
            name: {
                type: Schema.Types.ObjectId,
                required: true
            },
            photoPath: {
                type: String
            },
            description: {
                type: [String]
            },
            productPrice: {
                type: Number,
                required: true
            },
            typeOfProducts: {
                type: String,
                enum: ['Fruits', 'Vegetables', 'Salads'],
                default: 'Fruits'
            },
            rating:{
                type: Number,
                required: true
            },
            productQuantity:{
                type: Number,
                required: true
            },
        }],
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }

})

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema)

module.exports = ShoppingCart