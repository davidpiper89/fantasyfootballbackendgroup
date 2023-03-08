const express = require("express");
const app = express.Router();
const axios = require("axios");

//cache
const cache = {};

//proxy the football data due to cors issue
app.get("/", async (req, res) => {
  //if we have existing data
  if (cache.footballData && Date.now() < cache.timestamp + 1000 * 10) {
    res.send({ status: 1, footballData: cache.footballData });
    return;
  }

  //if we do not have data -
  const results = await axios.get(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );

  cache.footballData = results.data;
  cache.timestamp = Date.now();

  res.send({ status: 1, footballData: cache.footballData });
});

module.exports = app;
