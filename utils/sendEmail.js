const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    // service: process.env.EMAIL_SERVICE,
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD,
    service: SendGrid,
    auth: {
      user: apikey,
      pass: "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",
    },
  });

  const mailOptions = {
    from: "titasbiotech@gmail.com",
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
