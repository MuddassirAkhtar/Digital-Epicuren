const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
       user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendResendEmail = async (email,resetLink) => {

  const info = await transporter.sendMail({
    from: process.env.EMAIL_User, // sender address
    to: email,
    subject: "password reset request", // subject line
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset.</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });

  
}


module.exports = sendResendEmail