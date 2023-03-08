const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { generateToken } = require("../util");
const sha256 = require("sha256");
const { selectUserID, insertUserToLogin } = require("../mysql/queries");

app.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(process.env.SALT + password);

  const results = await asyncMySQL(selectUserID(), [email, password]);

  if (results.length == 0) {
    res.send({ status: 0 });
    return;
  }

  const token = generateToken(100);

  const loginResult = await asyncMySQL(insertUserToLogin(), [
    results[0].id,
    token,
  ]);

  if (loginResult.affectedRows === 1) {
    res.send({ status: 1, token });
  } else {
    res.send({ status: 0, error: "Did not work" });
  }
});

module.exports = app;
