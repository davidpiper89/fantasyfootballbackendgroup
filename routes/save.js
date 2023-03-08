const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { deleteLineup, insertFantasyLineup } = require("../mysql/queries");

app.put("/", async (req, res) => {
  if (!req.headers.token) {
    res.send({ status: 0 });
    return;
  }

  await asyncMySQL(deleteLineup(), [req.user_id]);

  req.body.dBTeam.forEach(async (player) => {
    await asyncMySQL(insertFantasyLineup(), [
      req.user_id,
      player.code,
      player.position,
    ]);
  });


  await asyncMySQL(`INSERT INTO fantasy
                      (user_id, score_deduction)
                       VALUES
                        (${req.user_id},${req.body.scoreDeduction})`);

  res.send({ status: 1 });
});

module.exports = app;
