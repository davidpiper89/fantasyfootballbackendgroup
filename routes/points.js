const express = require("express");
const app = express.Router();
const asyncMySQL = require("../mysql/connection");

app.put("/", async (req, res) => {
  try {
    const result = await asyncMySQL(
      `
      UPDATE fantasy
      JOIN users
      ON users.id = fantasy.user_id
      SET total_points = ?
      WHERE users.id = ?
    `,
      [req.body.payload, req.user_id]
    );

    if (result.affectedRows === 1) {
      res.send({ status: 1 });
    } else {
      res.send({ status: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 0, message: "Internal Server Error" });
  }
});

module.exports = app;
