const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
 });

 const getMailOptions = (reciever, subject, text) => {
    return {
        from: 'zubair.aquif1@gmail.com',
        to: reciever,
        subject: subject,
        text: text
    }
 }

const sendEmail = (mailOptions) => {
    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
     });
}

module.exports = {
    sendEmail,
    getMailOptions
}