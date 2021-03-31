var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
var bcrypt = require('bcrypt');
var userModel = require('../models/userModel');
// const { router } = require('../app');
var contactModel = require('../models/conatctModel');
const { route } = require('./products');


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
      password:hash,
      role : "user"
  });
user.save().then(x=>{
  res.json({message:"sent"})})
//   .then(createdUser => {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user:"yassine.bichiou@gmail.com",
//         pass:"" // naturally, replace both with your real credentials or an application-specific password
//       }
//     });
//     const template = fs.readFileSync(path.resolve('./common/mail_templates','register_mail.html'), {encoding: 'utf-8'})
//     const html = ejs.render(template, {
//       name: createdUser.name
//     }) 


//        mailOptions = {
//           from: 'mahmoudfadhel2@gmail.com',
//           to: createdUser.email,
//           subject: 'Register',
//           html: html
//         };
//         transporter.sendMail(mailOptions, function(error, info){
//           if (error) {
//             console.log(error);
//            res.json({message:'error'})
//           } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });

//   res.json({message:"sent"})
// })
      
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
          message: "failed to create a user!"+error
          
      });
  });
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
    console.log(user.role)
  const data={
             email: user.email,
             userId:user._id,
             role : user.role
           };
           const createdToken = jwt.sign(data,'secret', {expiresIn:'1h'});
           res.json({message:'login succesfully', token :createdToken })
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

 //Contact
 router.post('/contact', (req, res)=> {
contactModel.create({
  name : req.body.name,
  email:req.body.email,
  phone:req.body.phone,
  message:req.body.message,
  status : false

}).then(contactAdmin=>{
  res.json({
    message:"Done",
    
  })
})

 })

 router.get('/getAllContacts',passport.authenticate('bearer', { session: false }), function(req, res, next){
 contactModel.find().then(allContacts=>{
  res.json(allContacts)
}).catch(err=>res.send(err))
})

router.get("/updateStatusById/:id",passport.authenticate('bearer', { session: false }), function(req, res, next){
  contactModel.findByIdAndUpdate(req.params.id , {status: true},{new : true}).then(x=>{
  res.json(x)
}).catch(err=>res.send(err))
})

// router.get("/getUserById/:id", function (req,res,next){

// })



router.get('/getUser/:id' , (req,res,next)=>{
  userModel.findById(req.params.id).then(x=>{
    res.json(x)
  })
})





module.exports = router;











