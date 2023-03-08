const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { updateUserImage } = require("../mysql/queries");

app.post("/", async (req, res) => {
  let { userImage } = req.body;

  if (!userImage) {
    res.send({ status: 0, error: "No image" });
    return;
  }

  const result = await asyncMySQL(updateUserImage(), [
    userImage,
    req.headers.token,
  ]);

  if (result.affectedRows === 1) {
    res.send({ status: 1 });
  } else res.send({ status: 0 });
});

module.exports = app;
