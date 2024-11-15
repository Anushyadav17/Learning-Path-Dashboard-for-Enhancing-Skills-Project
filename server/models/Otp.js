const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/temples/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now(),
        expires : 5*60,
    },
});

async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from study website", otpTemplate(otp));
        console.log("Email sent successfully",mailResponse);
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})

const OTP = mongoose.model("OTP",otpSchema);
module.exports = OTP;