const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const sha256 = require("sha256");
const { insertUser, insertFantasy } = require("../mysql/queries");
const sendEmail = require("../email/nodemailer");
const { welcomeEmail } = require("../email/emailTemplates");

app.post("/", async (req, res) => {
  let { email, user_name, password } = req.body;

  if (!email || !user_name || !password) {
    res.send({ status: 0, error: "hello" });
    return;
  }

  password = sha256(process.env.SALT + password);
  const name = user_name;

  const results = await asyncMySQL(insertUser(), [email, user_name, password]);
  // res.send({ t: 5, results });

  if (results.affectedRows === 1) {
    await asyncMySQL(insertFantasy(), [results.insertId]);
    res.send({ status: 1 });
    sendEmail(email, welcomeEmail(name).subject, welcomeEmail().content);
  } else {
    res.send({ status: 0, error: "Duplicate user!" });
  }
});

module.exports = app;
