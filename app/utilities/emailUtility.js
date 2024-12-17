const nodemailer=require('nodemailer')


const SendEmail=async (EmailTo,EmailText,EmailSubject)=>{
  const transport=   nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "rm.shanto786@gmail.com",
      pass: "isqpwpxmwwdfjvyt"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  const mailOption={
    from:"UserRegistration.ltd <rm.shanto786@gmail.com>",
    to:EmailTo,
    subject:EmailSubject,
    text:EmailText
  }
  return await transport.sendMail(mailOption)
}

module.exports =SendEmail