const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { updateTeamName } = require("../mysql/queries");

app.post("/", async (req, res) => {
  let { teamName } = req.body;
  let { token } = req.headers;

  if (!teamName) {
    res.send({ status: 0 });
    return;
  }

  const results = await asyncMySQL(updateTeamName(), [teamName, token]);

  if (results.affectedRows === 1) {
    res.send({ status: 1 });
  } else {
    res.send({ status: 0 });
  }
});

module.exports = app;
