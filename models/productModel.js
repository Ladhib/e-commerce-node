var mongoose = require('mongoose')
   var Schema = mongoose.Schema

   const productModel = new Schema ({

    productName: {type : String},
    gender : {type : String},
    categorie :{type:String},
    topProduct : {type:Boolean},
    description : {type : String},
    price : {type : Number},
    imageProduct: {type : String},
    sizesQuantity : [],
    discount : {type : Number,default:0}



   })
 module.exports=mongoose.model("product", productModel)