var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var categorieModel = new Schema({
 categorie: {type :String},

  
});

module.exports=mongoose.model("categorie",categorieModel)