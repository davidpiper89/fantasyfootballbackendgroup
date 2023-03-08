const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { getTeamNameResults, getLineUpResults } = require("../mysql/queries");

app.get("/", async (req, res) => {
  const teamNameResults = await asyncMySQL(getTeamNameResults(), [
    req.headers.token,
  ]);

  const lineUpResults = await asyncMySQL(getLineUpResults(), [
    req.headers.token,
  ]);
  res.send({
    status: 1,
    fantasy: {
      teamName: teamNameResults[0].teamName,
      lineUp: lineUpResults,
    },
  });
});

module.exports = app;
