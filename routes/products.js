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





router.post('/addProduct', upload.single('image') ,(req, res)=> {

  var image=req.file.path
console.log(req.body);
    const product = new productModel({
          productName:req.body.productName,
          gender:req.body.gender,
          imageProduct: image,
          categorie:req.body.categorie,
          topProduct:req.body.topProduct,
          description:req.body.description,
          price:req.body.price,
          sizesQuantity:JSON.parse(req.body.sizesQuantity),
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



/* GET users listing. */
router.get('/getAllProducts', function(req, res, next) {
  productModel.find().then(allProducts=>{
    res.json(allProducts)
  })

});

router.delete('/deleteProduct/:id', (req, res, next) => {
  productModel.findByIdAndRemove(req.params.id).then(x => {
    res.json({
      message: "deleted",
    })
  });
});
// get product by gender
router.get('/getMensProduct' , function (req, res, next) {
  productModel.find({gender:"male"}).then(product=>{
    res.json(product)
  }) 

})
router.get('/getWomensProduct' , function (req, res, next) {
  productModel.find({gender:"female"}).then(product=>{
    res.json(product)
  })

})


router.get('/getProductsByGender/:gender' , function (req, res, next) {
  productModel.find({gender:req.params.gender}).then(product=>{
    res.json(product)
  })

})

router.get('/getProductsByGenderAndCategory/:gender/:categorie' , function (req, res, next) {
  productModel.find({gender:req.params.gender,categorie:req.params.categorie}).then(product=>{
    res.json(product)
  })

})

router.get('/productById/:id',(req,res)=>{
productModel.findById(req.params.id).then(response=>{
  res.json(response)
})

}
)
router.put('/update/:id', upload.single('image'), (req, res, next) => {
  console.log(req.body.sizesQuantity);
  let data = JSON.parse(req.body.sizesQuantity);
  req.body.sizesQuantity = data;
  productModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).then(y => {
    productModel.findByIdAndUpdate(req.params.id,{imageProduct:req.file.path},{new:true}).then(response=>{
      res.json(response)
    })
  })
}),


/* GET size by product */
router.get('/getSizeByProduct/:productId', function(req, res, next) {
  var sizes = []
  productModel.findById(req.params.productId).then(product=>{
   product.sizesQuantity.forEach(element => {
     sizes.push(element.size)
   })
   res.json(sizes)
  }).catch(err=>{
    console.log(err);
  })
});
router.get('/getQuantityByProduct/:productId', function(req, res, next) {
  var quantity = []
  productModel.findById(req.params.productId).then(product=>{
   product.sizesQuantity.forEach(element => {
     quantity.push(element.quantity)
   })
   res.json(quantity)
  }).catch(err=>{
    console.log(err);
  })
});


module.exports = router