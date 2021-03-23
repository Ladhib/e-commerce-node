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
<<<<<<< HEAD
    discount : {type : Number,default:0}

=======
    discount : {type : Number},
    selectedSize: {type : Number}
>>>>>>> 5adbc6b3ae37a0050a33aea5576e90a12f69700d


   })
 module.exports=mongoose.model("product", productModel)