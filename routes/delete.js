const express = require("express");
const asyncMySQL = require("../mysql/connection");
const { selectUserIDFromToken, deleteUser } = require("../mysql/queries");
const app = express.Router();

app.delete("/", async (req, res) => {
  const results = await asyncMySQL(selectUserIDFromToken(), [
    req.headers.token,
  ]);

  const deleteResult = await asyncMySQL(deleteUser(), [results]);

  if (deleteResult.affectedRows === 1) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0, error: "Account not deleted" });
  }
});

module.exports = app;
