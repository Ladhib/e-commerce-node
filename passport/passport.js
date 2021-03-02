const userModel = require("../models/userModel");
const BearerStrategy =require('passport-http-bearer').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken')


passport.use(new BearerStrategy(
async    (token, done)=> {
        const decodedData = await jwt.verify(token,'secret');
      userModel.findOne({_id:decodedData.userId}, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));