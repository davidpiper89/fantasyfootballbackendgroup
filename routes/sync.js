const express = require("express");
const asyncMySQL = require("../mysql/connection");
const axios = require("axios");
const { selectUser, selectFantasy } = require("../mysql/queries");

// Create an Express Router instance
const app = express.Router();

// Define the route for the root path
app.get("/", async (req, res) => {
  // Check is user id is defined
  if (!req.user_id) {
    res.status(400).send({ status: 0, error: "User ID is not defined" });
    return;
  }
  // Fetch user data, selected team, and fantasy table data
  const userData = await getUserData(req.user_id);
  const selectedTeam = await getSelectedTeam(req.user_id);
  const fantasyTable = await getFantasyTable();

  // Send the response with the fetched data
  res.send({ status: 1, ...userData, selectedTeam, fantasyTable });
});

// Function to fetch user data and user fantasy team name for a given user ID
async function getUserData(userId) {
  const [user] = await asyncMySQL(selectUser(), [userId]);
  user.notificationEmails = user.notificationEmails === 1 ? true : false;

  const [fantasy] = await asyncMySQL(selectFantasy(), [userId]);
  user.fantasy = { teamName: fantasy ? fantasy.teamName : '' }; // Set teamName to an empty string if fantasy is undefined

  return { user };
}

// Function to fetch selected team data for a given user ID
async function getSelectedTeam(userId) {
  // Fetch football data from external API
  const footballData = await axios.get(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );

  // Fetch line up data for the given user ID
  const lineUp = await asyncMySQL(
    `SELECT code FROM line_up WHERE user_id = ?`,
    [userId]
  );

  // Map the line up data to an array of player codes
  const lineUpList = lineUp.map((element) => element.code);

  // Filter the football data to return only the players in the user's line up
  return footballData.data.elements.filter((item) => {
    return lineUpList.includes(item.code);
  });
}

// Function to fetch fantasy table data
async function getFantasyTable() {
  return await asyncMySQL(
    `SELECT team_name, score_deduction, total_points FROM fantasy`
  );
}

// Export the Express Router instance
module.exports = app;
