const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/user');
const ejs = require("ejs")
const path = require("path")


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'nandikasin00',
        pass: '@Nandika*sin'
 }

})

const emailTo = async(email)=>{
    
    var emailFormat = path.join(__dirname, "../views/mailFormat.ejs")
    var data = await ejs.renderFile(emailFormat);
    console.log(typeof(email));
    console.log(email)

    const options = {
        from: "'Nandika' nandikasin00@gmail.com",
        to: email,
        subject: 'Task completed',
        html: data

    };
    await transporter.sendMail(options);
    
};


module.exports = transporter;
module.exports = emailTo;