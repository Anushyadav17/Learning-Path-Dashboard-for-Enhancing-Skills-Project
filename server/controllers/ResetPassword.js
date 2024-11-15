const mailSender = require("../utils/mailSender");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async(req,res) => {
   try {
        const email = req.body.email;

        //check user
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false,
                messeage : "You are not registered! Please signup first",
            })
        }

        const token = crypto.randomBytes(20).toString("hex");

        const update = await User.findOneAndUpdate(
            {email : email},
            {
                token : token,
                resetPasswordTokenExperies : Date.now() + 5*60*1000,
            },
            {new : true},
        )

        console.log(update);

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email,"Reset Password Link",`Reset Password link is ${url}`);

        return res.status(200).json({
            success : true,
            message : "Reset password mail send successfully",
        });
   }
   catch(error) {
       console.log(error);
       return res.status(404).json({
            success : false,
            message : "error while sending reset password mail",
       })
   }
}

exports.resetPassword = async(req,res) => {
    try{
        const {password,confirmPassword,token} = req.body;

        if(password !== confirmPassword){
            return res.status(404).json({
                success : false,
                message : "password and confirm password not matched",
            });
        }

        const user = await User.findOne({token : token});

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "User not found",
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        await User.findOneAndUpdate(
            {token : token},
            {password : hashPassword},
            {new : true},
        )

        return res.status(200).json({
            success : true,
            message : "Password reset successfully",
        })
    }
    catch(error) { 
        return res.status(401).json({
            success : false,
            message : "Error while reseting password",
        })
    }
}