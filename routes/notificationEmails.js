const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { updateEmailPref } = require("../mysql/queries");

app.put("/", async (req, res) => {
  let { notificationEmails } = req.body;
  if (typeof notificationEmails !== "boolean") {
    res.send({ status: 0 });
    return;
  }

  const result = await asyncMySQL(updateEmailPref(), [
    notificationEmails ? 1 : 0,
    req.headers.token,
  ]);
  if (result.affectedRows === 1) {
    res.send({ status: 1 });
  } else res.send({ status: 0 });
});

module.exports = app;
