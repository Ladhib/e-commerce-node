var express = require('express');
var router = express.Router();
var categorieModel = require('../models/categorieModel')


router.post('/addCategorie', function(req, res, next) {
    categorieModel.create({
        categorie : req.body.categorie,
        
      }).then(categorie=>{
        res.json({
          message:"Done",
          
        })
      })
      
       })
    
       router.get('/getAllCategorie', function(req, res, next){
        categorieModel.find().then(allCategorie=>{
         res.json(allCategorie)
       }).catch(err=>res.send(err))
       })


       



module.exports = router;
