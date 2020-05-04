const mongoose=require('mongoose')
const Schema=mongoose.Schema

const orderTrackingSchema=new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    orderNumber: {
        type: Schema.Types.ObjectId,
        required: true
    },
    status:{
        type:String,
        enum: ['Pending', 'Delivered', 'Completed'],
        default: 'Pending'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }

})

const OrderTracking = mongoose.model('OrderTracking', orderTrackingSchema)

module.exports = OrderTracking
