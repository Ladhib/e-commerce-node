
const jwt = require("jsonwebtoken")

  exports.ensureToken=(req,res,next)=>{
    
    const bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader!=="undefined"){
    const bearer=bearerHeader.split(" ");
    const bearerToken=bearer[1];
    jwt.verify(bearerToken,'secret',function(err,data){
        if(err)
        res.status(401).json({
          message:"forbidden"
        })
        return;

    // next();
  
    })
    
    }
    else{
        res.sendStatus(403);
    }
  }