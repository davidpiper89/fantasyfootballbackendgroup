// const express = require("express");
// const asyncMySQL = require("../mysql/connection");
// const axios = require("axios");
// const app = express.Router();
// const { selectTable } = require("../mysql/queries");

// app.get("/", async (req, res) => {
//   try {
//     if (!req.user_id) {
//       return res
//         .status(400)
//         .send({ status: 0, error: "User ID is not defined" });
//     }

//     const userTable = await getUserTable();

//     res.send({
//       status: 1,
//       userTable,
//     });

//   } catch (error) {
//     res.status(500).send({ status: 0, error: error.message });
//   }
// });

// async function getUserTable() {
//   const table = await asyncMySQL(selectTable());
//   return table
// }

// module.exports = app;
