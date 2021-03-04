var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');

var userModel = require("../models/userModel");
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');


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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:"mahmoudfadhel2@gmail.com",
        pass:"moez20082009" // naturally, replace both with your real credentials or an application-specific password
      }
    });
    const template = fs.readFileSync(path.resolve('./common/mail_templates','register_mail.html'), {encoding: 'utf-8'})
    const html = ejs.render(template, {
      name: createdUser.name
    }) 


       mailOptions = {
          from: 'mahmoudfadhel2@gmail.com',
          to: createdUser.email,
          subject: 'Register',
          html: html
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
           res.json({message:'error'})
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

  res.json({message:"sent"})
})
      
    })
  //   .catch(error => {
  //     console.log(error)
  //     res.status(500).json({
  //         message: "failed to create a user!"+error
          
  //     });
  // });
  });


//login//

router.post('/login', async function  (req, res) {
  const user = await userModel.findOne({
            email: req.body.email
   })
  //  .then(user=> {
     if (!user) {
       return res.status(401).json({
         message: "Auth failed"
       });
     }
     else{
 bcrypt.compare(req.body.password, user.password, function (err, result) {
  if (result){
  const data={
             email: user.email,
             userId:user._id
           };
           const createdToken = jwt.sign(data,'secret', {expiresIn:'1h'});
           res.json({message:'login succesfully', token :createdToken})
          }
          else {
            return res.json({
              message: "Auth failed"
            });
          }
        }
     
      )};
 //});
 });



module.exports = router;











