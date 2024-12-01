const nodemailer = require('nodemailer');
require("dotenv").config();

const mailSender = async (email,title,body) => {
    try{
        let tansporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        let info = await tansporter.sendMail({
            from : '"Project Mail || Anush Yadav" <${process.env.MAIL_USER}>',
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`,
        })
        console.log(info);
        return info;
    }
    catch(error)
    {
        console.log("error occures in sending mail : ");
    }
}

module.exports = mailSender;