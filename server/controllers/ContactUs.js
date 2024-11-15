const mailsender = require('../utils/mailSender');
const contactUsEmail = require("../mail/temples/contactFromRes");
const mailSender = require('../utils/mailSender');
require("dotenv").config();

exports.contactUsController = async(req,res) => {
    const {firstName, lastName, email, phoneNo, message} = req.body;

    try {
        if(!firstName || !lastName || !email || !phoneNo || !message)
        {
            return res.status(400).json({
                success : false,
                message : 'All fields are required',
            });
        }

        //sending mail to student
        await mailsender(
            email,
            "Your Data send successfully",
            contactUsEmail(email, firstName, lastName, message, phoneNo,),
        )

        //sending mail to self
        await mailSender(
            process.env.MAIL_USER,
            "ContactUs details of student",
            `Mail from ${email} <br> Message : ${message}`,
        )

        return res.status(200).json({
            success : true,
            message : "Email sent successfully",
        })
    }
    catch( error ){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}