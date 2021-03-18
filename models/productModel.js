var mongoose = require('mongoose')
   var Schema = mongoose.Schema

   const productModel = new Schema ({

    productName: {type : String},
    gender : {type : String},
    categorie :{type:String},
    topProduct : {},
    description : {type : String},
    price : {type : Number},
    imageProduct: {type : String},
    sizesQuantity : [],
    discount : {type : Number}



   })
 module.exports=mongoose.model("product", productModel)