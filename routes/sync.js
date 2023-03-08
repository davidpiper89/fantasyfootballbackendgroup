const express = require("express");
const asyncMySQL = require("../mysql/connection");
const app = express.Router();
const axios = require("axios");
const { selectUser, selectFantasy } = require("../mysql/queries");

app.get("/", async (req, res) => {
  //get user data from users
  const [user] = await asyncMySQL(selectUser(), [req.user_id]);

  //convert into bool
  user.notificationEmails = user.notificationEmails === 1 ? true : false;

  const [fantasy] = await asyncMySQL(selectFantasy(), [req.user_id]);

  //attach team name to fantasy and place inside users
  user.fantasy = { teamName: fantasy.teamName };

  //get latest player data
  const footballData = await axios.get(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );

  //get the user line up
  const lineUp = await asyncMySQL(`SELECT code FROM line_up
                                    WHERE user_id = ${req.user_id}`);

  const lineUpList = [];
  lineUp.forEach((element) => {
    lineUpList.push(element.code);
  });

  const selectedTeam = footballData.data.elements.filter((item) => {
    return lineUpList.includes(item.code);
  });

  //get the score deduction

  const scoreDeduction = await asyncMySQL(`SELECT score_deduction FROM fantasy
                                            WHERE user_id = ${req.user_id}`);

  //send all the data
  res.send({ status: 1, user, selectedTeam, scoreDeduction });
});

module.exports = app;
