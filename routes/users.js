var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');

var userModel = require('../models/userModel')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// SIGN UP

router.post('/userCreate',  (req, res)=> {
  
  bcrypt.hash( req.body.password, 10, function(err, hash) {
    const user = new userModel({
      name : req.body.name,
      email:  req.body.email,
      password:hash
  });
  user.save().then(createdUser => {
      res.status(201).json({
          message: "user added successfully",
      
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
          message: "failed to create a user!"+error
          
      });
  });
  });
});
module.exports = router;











