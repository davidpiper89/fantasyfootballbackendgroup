const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");
const { deleteLineup, insertFantasyLineup } = require("../mysql/queries");

// Middleware to check for token header
const checkTokenHeader = (req, res, next) => {
  if (!req.headers.token) {
    return res.send({ status: 0 });
  }
  next();
};

// Route handler for POST requests
app.post("/", checkTokenHeader, async (req, res) => {
  const { payload } = req.body;

  try {
    await asyncMySQL(deleteLineup(), [req.user_id]);

    // Use Promise.all to wait for all asyncMySQL calls to finish
    await Promise.all(
      payload.dBTeam.map((player) => asyncMySQL(insertFantasyLineup(), [req.user_id, player.code]))
    );

    await asyncMySQL(`INSERT INTO fantasy
                        (user_id, team_name, score_deduction)
                         VALUES
                          (?, ?, ?)`, [req.user_id, payload.teamName, payload.scoreDeduction]);

    res.send({ status: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 0, message: "Internal Server Error" });
  }
});

module.exports = app;
