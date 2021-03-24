var express = require('express');
var router = express.Router()
var productModel = require('../models/productModel')
const passport = require('passport')
var cmdModel = require('../models/cmd')
const jwtConfig = require("../JWTConfig/jwtverify") 

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





router.post('/addProduct',jwtConfig.ensureToken, upload.single('image'),(req, res)=> {

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
          discount:req.body.discount,
          selectedSize : req.body.selectedSize,
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



router.get("/getAllProducts", function(req, res, next) {
  productModel.find().then(allProducts=>{
    res.json(allProducts)
  })

});

router.get('/getProduct/:id' , (req,res,next)=>{
  productModel.findById(req.params.id).then(x=>{
    res.json(x)
  })
})
router.delete('/deleteProduct/:id',jwtConfig.ensureToken, (req, res, next) => {
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
  console.log(req.params.categorie);
  productModel.find({gender:req.params.gender,categorie:req.params.categorie}).then(product=>{
    res.json(product)
  })

})


router.get('/getProductsCategory/:categorie' ,function (req, res, next) {
  productModel.find({categorie:req.params.categorie}).then(product=>{
    res.json(product)
  })
})

router.get('/productById/:id',(req,res)=>{
productModel.findById(req.params.id).then(response=>{
  res.json(response)
})

}
)
router.put('/update/:id',jwtConfig.ensureToken, upload.single('image'), (req, res, next) => {
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
router.get('/getSizeByProduct/:productId',jwtConfig.ensureToken, function(req, res, next) {
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


router.get('/getQuantityByProduct/:productId',jwtConfig.ensureToken, function(req, res, next) {
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
// get top products:
router.get('/getTopProducts', function(req, res, next) {
  productModel.find({topProduct:true}).then(topProduct=>{
    res.json(topProduct)
  })

});
  // get On sale products:
router.get('/getOnSaleProducts',function(req, res, next) {
  productModel.find({"discount":{"$gt":"0"}}).then(onSaleProduct=>{
    res.json(onSaleProduct)
  })
});
  
router.put('/updateAfterComfirmation/:id', upload.single('image'), (req, res, next) => {
  productModel.findByIdAndUpdate(req.params.id,req.body).then(y => {
    res.json({
      message: "updated",
    })      
    console.log(req.body);
  })
})



router.post('/postCmd', jwtConfig.ensureToken,(req, res)=> {

    const Cmd = new cmdModel({
      firstName: req.body.billingForm.firstName ,
      lastName :req.body.billingForm.lastName ,
      middleName :req.body.billingForm.middleName,
      company:req.body.billingForm.company,
      email : req.body.billingForm.email,
      country: req.body.billingForm.country.name,
      city :  req.body.billingForm.city,
      state :  req.body.billingForm.state,
      zip:  req.body.billingForm.zip,
      address :  req.body.billingForm.address,
  
      cardHolderName :  req.body.paymentForm.cardHolderName,
      cardNumber :  req.body.paymentForm.cardNumber,
      expiredYear :  req.body.paymentForm.expiredYear,
      cvv :  req.body.paymentForm.cvv,
  
      // deliveryMethod :  req.body.deliveryForm.deliveryMethod.value,
      // productName: req.body.deliveryForm.deliveryMethod.name,

  });
      req.body.productId.forEach(element => {
        console.log(element);
        Cmd.product.push(element)
      })

  Cmd.save().then(x => {
      res.status(201).json({
          message: " successfully",

      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
          message: "failed !"+error

      });
  });

});































module.exports = router



