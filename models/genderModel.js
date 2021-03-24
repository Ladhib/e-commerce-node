var mongoose = require('mongoose')
   var Schema = mongoose.Schema

   const genderModel = new Schema ({

    gender: {type : String},
    categorie:[{ type: Schema.Types.ObjectId, ref:"categorie"}],
   })
 module.exports=mongoose.model("gender", genderModel)