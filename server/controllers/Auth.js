const User = require('../models/User');
const OTP = require('../models/Otp');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require("jsonwebtoken");


//otpSend
exports.sendOTP = async (req,res) => {

    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent)
        {
            return res.status(401).json({
                success : false,
                message : "User Already Exist",
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false,
        });

        const unqiueOtp = await OTP.findOne({otp:otp});

        while(unqiueOtp) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            }); 

            unqiueOtp = await OTP.find({otp:otp});
        }

        //storing otp 
        const otpBody = await OTP.create({email,otp});

        return res.status(200).json({
            success : true,
            message : "otp send successfully",
        })
    }
    catch(error)
    {
        console.log("error while genrating otp  ");

        return res.status(404).json({
            success : false,
            message : error.message,
        })
    }
}

//signup
exports.signUp = async (req,res) => {

    const {accountType, firstName, lastName, email, password, confirmPassword, otp} = req.body;
    
    console.log(accountType)
    if(!firstName || !lastName || !email  || !password || !confirmPassword || !otp || !accountType)
    {
        return res.status(403).json({
            success : false,
            message : "All fields are required",
            
        })
    }

    if(password !== confirmPassword)
    {
        return res.status(400).json({
            success : false,
            message : "password and confirm password not matched",
        })
    }

    try{
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                success : false,
                message : "User already exist",
            })
        }

        //check most recent otp
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
        console.log(recentOtp);

        if(recentOtp.length === 0)
        {
            return res.status(400).json({
                success : false,
                message : "OTP not found",
            })
        }
        else if(otp !== recentOtp[0].otp)
        {
            return res.status(400).json({
                success : false,
                message : "OTP is not matched",
            })
        }

        const profileDetails = await Profile.create({
            gender : null,
            DOB : null,
            about : null,
            contactNumber : null,
        });

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            firstName, 
            lastName, 
            email,
            password: hashPassword,
            accountType: accountType,
            additionalDetails: profileDetails._id,
            image : `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success : true,
            message : "User register Successfully",
            
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(404).json({
            success : false,
            message : "error while regestering user",
        })
    }

    
}

//login
exports.login = async(req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(401).json({
                success : false,
                message : "All fields are required",
            });
        }

        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "User not found please signup first",
            });
        }

        if(await bcrypt.compare(password,user.password)) {
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "2h",
            });

            user.token = token;

            //create cookies
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true,
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : 'Log in Successfully',
            })
        }
        else
        {
            return res.status(401).json({
                success : false,
                message : "Password doesnot matched",
            });
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : 'Error while login',
        });
    }
}
//change Password
exports.changePassword = async(req,res) => {

    const {oldPassword, newPassword} = req.body;

    if(!oldPassword || !newPassword)
    {
        return res.status(401).json({
            success : false,
            message : 'All fields are required',
        });
    }

    if(oldPassword === newPassword)
    {
        return res.status(401).json({
            success : false,
            message : 'New pasword should be different from old password',
        });
    }

    try{
        const userId = req.user._id;

        const user = await User.findOne({ id: userId });

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect old password',
            });
        }

        const hashPassword = await bcrypt.hash(newPassword,10);

        // Update password
        user.password = hashPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};