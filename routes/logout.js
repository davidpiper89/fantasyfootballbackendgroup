const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");

app.delete("/", async (req, res) => {
  await asyncMySQL(logout(), [req.headers.token]);
  res.send({ status: 1 });
});

module.exports = app;
