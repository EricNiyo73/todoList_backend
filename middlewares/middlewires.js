const  jwt  =  require("jsonwebtoken");
const  User =  require ("../app/models/user.model.js");
async function  Authorization (req,res,next){

    try {

//   console.log(req.headers);
let token  =req.headers.authorization;
    if(token ) {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        const  user  =  await User.findById(decoded.id);
        if(user.userType === "admin"){
            next();
        }
        else{
            return  res.status(401).json({
                message:"Only admin can do this operation"
            })
        }
        
    }
    else {
      return  res.status(401).json({
            status:"failed",
            message :"Unauthorized",
        })
    }
}
catch (error){
    return  res.status(400).json({
        message:"Invalid token"
    })
}

}

module.exports = Authorization;