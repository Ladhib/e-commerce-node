var mongoose = require('mongoose')
   var Schema = mongoose.Schema

   const cmdModel = new Schema ({

    firstName: {type : String},
    lastName : {type : String},
    middleName :{type:String},
    company:{type:String},
    email : {type:String},
    country: {type : String},
    city : {type:String},
    state : {type : String},
    zip:{type:String},
    address : {type:String},

    cardHolderName : {type:String},
    cardNumber :{type:Number},
    expiredYear :{type:Number},
    cvv :{type:Number},

    deliveryMethod : {type:String},
    product:[],
      // {type: Schema.Types.ObjectId , ref:"product"}
    
 
   })
 module.exports=mongoose.model("cmdModel", cmdModel)

 


