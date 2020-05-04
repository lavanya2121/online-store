const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productSchema=new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
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
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product

//userid-5eaee9a802ec9518c8978f8f
//productid-5eb03a91a5d2a5080410ccef
// {
// 	"name":"Iphone2",
// 	"photoPath":"E:/LAVANYA-DCT-FINAL-PROJECTS21/E-commerce-portfolio-project/onlineStore/download.jpg",
// 	"description":["its a nice product","very cheap also"],
// 	"productPrice":50000,
// 	"typeOfProducts":"Fruits",
// 	"rating":"4.0",
// 	"productQuantity":"2",
// 	"user":"5eaee9a802ec9518c8978f8f"
// }

//response from the server
// {
//     "notice": "successfully created a Product",
//     "product": {
//         "createdAt": "2020-05-04T11:13:36.000Z",
//         "description": [
//             "its a nice product",
//             "very cheap also"
//         ],
//         "typeOfProducts": "Fruits",
//         "_id": "5eaffcb2bd8738009090b33d",
//         "name": "Iphone2",
//         "photoPath": "E:/LAVANYA-DCT-FINAL-PROJECTS21/E-commerce-portfolio-project/onlineStore/download.jpg",
//         "productPrice": 50000,
//         "rating": 4,
//         "productQuantity": 2,
//         "user": "5eaee9a802ec9518c8978f8f",
//         "__v": 0
//     }
// }