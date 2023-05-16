const express = require("express");
const asyncMySQL = require("../mysql/connection");
const axios = require("axios");
const {
  selectUser,
  selectFantasy,
  selectLineUp,
  selectScoreDeduction,
  selectTable,
} = require("../mysql/queries");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    if (!req.user_id) {
      return res
        .status(400)
        .send({ status: 0, error: "User ID is not defined" });
    }

    const userData = await getUserData(req.user_id);
    const selectedTeam = await getSelectedTeam(req.user_id);
    const scoreDeduction = await getScoreDeduction(req.user_id);
    const table = await getTable();

    res.send({
      status: 1,
      ...userData,
      selectedTeam,
      scoreDeduction,
      table,
    });
  } catch (error) {
    res.status(500).send({ status: 0, error: error.message });
  }
});

async function getUserData(userId) {
  const [user] = await asyncMySQL(selectUser(), [userId]);
  user.notificationEmails = user.notificationEmails === 1;

  const [fantasy] = await asyncMySQL(selectFantasy(), [userId]);
  user.fantasy = { teamName: fantasy ? fantasy.teamName : "" };

  return { user };
}

async function getSelectedTeam(userId) {
  const footballData = await axios.get(
    `https://fantasy.premierleague.com/api/bootstrap-static/`
  );
  const lineUp = await asyncMySQL(selectLineUp(), [userId]);
  const lineUpList = lineUp.map((element) => element.code);

  return footballData.data.elements.filter((item) =>
    lineUpList.includes(item.code)
  );
}

async function getScoreDeduction(userId) {
  const [scoreDeduction] = await asyncMySQL(selectScoreDeduction(), [userId]);
  return scoreDeduction || { score_deduction: 0 };
}

async function getTable() {
  const table = await asyncMySQL(selectTable());
  return table;
}

module.exports = app;
