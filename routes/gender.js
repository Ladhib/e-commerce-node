var express = require('express');
const categorieModel = require('../models/categorieModel');
var router = express.Router();
var genderModel = require('../models/genderModel')

/* GET home page. */
router.post('/addGender', function(req, res, next) {
genderModel.create({
    name : req.body.name,
    
  }).then(gender=>{
    res.json({
      message:"Done",
      
    })
  })
  
   })
   
   router.get('/getGender', function(req, res, next){
    genderModel.find().then(gender=>{
     res.json(gender)
   }).catch(err=>res.send(err))
   })

  router.post('/affectCategorie/:genderId/:categorieId', function (req, res, next) {
      categorieModel.findById(req.params.categorieId).then(categorie=>{
          genderModel.findByIdAndUpdate(req.params.genderId , {$push:{categorie:categorie._id}}).then(
            gender=>{
              res.json({
                message:"affected",
                gender:gender
              })
            }
          )
      })
  })

  router.get('/getGenderByName/:name', (req,res,next)=>{
    genderModel.find({name:req.params.name}).then(gender=>{
      res.json(gender)
    }).catch(err=>res.send(err))
   })





module.exports = router;
