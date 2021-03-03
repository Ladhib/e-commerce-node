var express = require('express');
var router = express.Router()
var productModel = require('../models/productModel')

const multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadedImages')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' +  file.originalname )
    }
  })
const upload = multer({ storage:storage })


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/addProduct', upload.single('image') ,(req, res)=> {
    
  var image=req.file.path
console.log(image);
    const product = new productModel({
          productName:req.body.productName,
          gender:req.body.gender,
          imageProduct:image,
          categorie:req.body.categorie,
          topProduct:req.body.topProduct,
          description:req.body.description,
          price:req.body.price,
          sizesQuantity:req.body.sizesQuantity,
  });
  product.save().then(createdProduct => {
      res.status(201).json({
          message: "product added successfully",

      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
          message: "failed to create a product!"+error

      });
  });

});
module.exports = router