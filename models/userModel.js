   
   var mongoose = require('mongoose')
   var Schema = mongoose.Schema
   
   const userModel = new Schema ({

    name : {type : String},
    email : {type : String},
    password :{type : String},
    role : {type : String}

   })
 module.exports=mongoose.model("user", userModel)