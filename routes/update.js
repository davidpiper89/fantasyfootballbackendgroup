const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { updateUsers } = require("../mysql/queries");
const sha256 = require("sha256");

app.put("/", async (req, res) => {
  let { email, userName, password } = req.body;
  if (!email || !userName || !password) {
    res.send({ status: 0 });
    return;
  }

  password = sha256(process.env.SALT + password);

  const result = await asyncMySQL(updateUsers(), [
    email,
    userName,
    password,
    req.headers.token,
  ]);
  if (result.affectedRows === 1) {
    res.send({ status: 1 });
  } else res.send({ status: 0 });
});

module.exports = app;
