var mongoose = require('mongoose')
   var Schema = mongoose.Schema

   const contactModel = new Schema ({

    name: {type : String},
    email : {type : String},
    phone :{type:Number},
    message : {type : String},
   })
 module.exports=mongoose.model("message", contactModel)