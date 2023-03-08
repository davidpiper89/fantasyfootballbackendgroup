const asyncMySQL = require("../mysql/connection");

const auth = async (req, res, next) => {
  const results =
    await asyncMySQL(`SELECT count(*) AS count, user_id FROM logins
                                    WHERE token= "${req.headers.token}" ;`);

  req.user_id = results[0].user_id;

  if (results[0].count === 1) {
    next();
  } else {
    res.send({ status: 0, error: "The token was invalid" });
  }
};

module.exports = auth;
