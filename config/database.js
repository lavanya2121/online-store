const mongoose=require('mongoose')
const setupDB=()=>{
    mongoose.connect('mongodb://localhost:27017/Online-Store')
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=setupDB
