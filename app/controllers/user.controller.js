const { db } = require('../models/user.model.js');
const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const {authpage }= require('./middlewares');
require('dotenv').config()
// Create and Save a new user
exports.create = async (req, res) => {
   
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password,salt);
    User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length >= 1){
                return res.status(409).json({
                    message:'user already exists'
                });
            } else{
                  // Create a user
    const user = new User({
        userType: req.body.userType,
        email: req.body.email, 
        password: hashedpassword,
    
    });
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
    res.status(201).json({
        status: 'success',
        token,
        data:{
            User: user
        }
    });
    // Save user in the database
    user.save()
    .then(data => {
       return res.send(data);
    }).catch(err => {
      return res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
            }

  
})
};
// =================getting all========================
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
      return  res.send(users);
    }).catch(err => {
      return  res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        });
    });
};


// ===============login================
exports.findOne =(req,res)=>{
    User.find({email:req.body.email}).select('+password')
    .exec()
    .then(user =>{
        const userlogin = new User({
            userType: req.body.userType,
            email: req.body.email, 
            password: req.body.password
        });
        if(user.length <1){
            return res.status(401).json({
                message: 'user not exist'
            });
        }

        if(!userlogin.email ||!userlogin.password){
            return res.status(500).json({
                message: 'please provide email and password'
            })   
             } else{
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
                //  const validPass =  bcrypt.compare(req.body.password,user.password);
           return res.status(200).json({
                status: 'logged successfully',
                token
            })
             }

        // if(user.length >= 1){
        //     return res.status(409).json({
        //         message:'logged successfully'
        //     });
        // } 
        // console.log(user)
    
       



        // user.compare(req.body.password,user[0],(err,result)=>{
        //     if(err){
        //         return res.status(401).json({
        //             message: "user not exist"
        //         })
        //     }
        //     if(result){
        //         return res.status(200).json({
        //             message: 'logged successful'
        //         });
        //     }
        // }) ;   
        
    });
}



// const express = require("express");
// const { default: mongoose } = require("mongoose");
// const router =express.Router();
// const mongoose =require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("../models/user.model.js");
// router.post("/signup", (req ,res,next) =>{
//     User.find({email:req.body.email})
//     .exec()
//     .then(user=>{
//         if(user.length >= 1){
//             return res.status(409).json({
//                 message:'user exists'
//             });
//         }else{
//             bcrypt.hash(req.body.password, 10, (err,hash)=>{
//                 if(err){
//                     return res.status(500).json({
//                         error:err
//                     });
//                 } else{
//                     const user = new User({
//                         _id: new mongoose.Types.ObjectId(),
//                         email:req.body.email,
//                         password:hash
    
//                 });
//                 user.save()
//                 .then(result =>{
//                     console.log(result);
//                     res.status(201).json({
//                         message: "User Created"
//                     });
//                 })
//                 .catch(err =>{
//                     console.log(err);
//                     res.status(500).json({
//                         error:err
//                     });
//                 })
//             }
//         });
//         }
//     })
  
// });
// module.exports = router;