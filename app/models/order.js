const mongoose=require('mongoose')
const Schema=mongoose.Schema

const orderSchema=new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    orderNumber: {
        type: String,
        required: true
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
    // status:{
    //     type:String,
    //     enum: ['Pending', 'Delivered', 'Completed'],
    //     default: 'Pending'

    // },
    billAmount:{
        type:Number,
        required: true 
    },
    modeofPayment:{
        type:String,
        enum: ['CreditCard', 'DebitCard', 'CashOnDelivery'],
        default: 'CreditCard'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }

})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
