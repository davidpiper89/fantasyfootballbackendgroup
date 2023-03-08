const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_DOMAIN,
  port: 587, //hp lies
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
  tls: { rejectUnauthorized: false },
});

function sendEmail(toAddress, subject, content) {
  const mailOptions = {
    from: "hi@fantasy-football-app.uk",
    to: toAddress,
    subject,
    text: content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    console.log(err, info);
  });
}

module.exports = sendEmail;
