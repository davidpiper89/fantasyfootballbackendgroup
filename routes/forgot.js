const express = require("express");
const { forgotMail } = require("../email/emailTemplates");
const sendEmail = require("../email/nodemailer");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const sha256 = require("sha256");
const { generatePassword } = require("../util");
const { forgotPassword } = require("../mysql/queries");

app.patch("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.send({ status: 0 });
    return;
  }

  const password = generatePassword(4);
  const shaPassword = sha256(process.env.SALT + password);

  const result = await asyncMySQL(forgotPassword(), [shaPassword, email]);

  if (result.affectedRows === 1) {
    res.send({ status: 1 });
    sendEmail(email, forgotMail().subject, forgotMail(password).content);
  } else res.send({ status: 0 });
});

module.exports = app;
