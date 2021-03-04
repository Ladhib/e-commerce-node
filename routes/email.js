const nodemailer = require('nodemailer');
const router = require('./users');
var userModel = require("../models/userModel");
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');


router.post('/confirmation/:id', function(req , res, next){
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:"mahmoudfadhel2@gmail.com",
          pass:"moez20082009" // naturally, replace both with your real credentials or an application-specific password
        }
      });
      const template = fs.readFileSync(path.resolve('./common/mail_templates','confirmation_mail.html'), {encoding: 'utf-8'})
      const html = ejs.render(template, {
        name: req.params.name
      }) 
userModel.findById(req.params.id).then(user=>{
  
         mailOptions = {
            from: 'mahmoudfadhel2@gmail.com',
            to: user.email,
            subject: 'Confirmation de Commande',
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
    }) 
    res.json({message:"sent"})
})


router.post('/register/:id', function(req , res, next){
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:"mahmoudfadhel2@gmail.com",
          pass:"moez20082009" // naturally, replace both with your real credentials or an application-specific password
        }
      });
      const template = fs.readFileSync(path.resolve('./common/mail_templates','register_mail.html'), {encoding: 'utf-8'})
      const html = ejs.render(template, {
        name: req.params.name
      }) 
userModel.findById(req.params.id).then(user=>{
  
         mailOptions = {
            from: 'mahmoudfadhel2@gmail.com',
            to: user.email,
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
    }) 
    res.json({message:"sent"})
})


module.exports = router;