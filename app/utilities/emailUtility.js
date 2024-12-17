import nodemailer from "nodemailer";

export const EmailSender = async (
  EmailTo,
  EmailText,
  EmailSubject,
  EmailHTMLBody
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    tls: { rejectUnauthorized: false },
  });
  const mailOptions = {
    from: EMAIL_USER,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
    html: EmailHTMLBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    return "User Email Verified successfully";
  } catch (err) {
    return "error sending" + err.toString();
  }
};
