const nodemailer = require("nodemailer");
let dotENV = require("dotenv");
dotENV.config();

const SendEmail = async (EmailTo, EmailText, EmailSubject) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOption = {
    from: "UserRegistration.ltd <rm.shanto786@gmail.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  return await transport.sendMail(mailOption);
};

module.exports = SendEmail;
