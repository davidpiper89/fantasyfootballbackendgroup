module.exports = {
  insertUser: () => {
    return `INSERT IGNORE users
    (email, user_name, password)
      VALUES
        (?, ?, ?);`;
  },
  deleteUser: () => {
    return `DELETE FROM users
    WHERE id = ?;`;
  },
  selectUserID: () => {
    return `SELECT id FROM users
  WHERE email = ? 
  AND password = ?;`;
  },
  insertUserToLogin: () => {
    return `INSERT INTO logins
    (user_id, token)
      VALUES
      (?, ?);`;
  },
  selectUserIDFromToken: () => {
    return `SELECT user_id FROM logins
    WHERE token = ?;`;
  },
  getTeamNameResults: () => {
    return `SELECT team_name AS teamName 
    FROM fantasy
    JOIN logins
    ON fantasy.user_id = logins.user_id
    WHERE token = ?;`;
  },
  getLineUpResults: () => {
    return `SELECT player_id AS playerId, position  
                                      FROM line_up
                                      JOIN logins
                                      ON line_up.user_id = logins.user_id
                                      WHERE token = ?;`;
  },
  logout: () => {
    return `DELETE FROM logins
                      WHERE token = ?;`;
  },
  updateUsers: () => {
    return `UPDATE users
                          JOIN logins
                          ON users.id = logins.user_id
                          SET email = ?, 
                          user_name = ?,
                          password = ?
                          WHERE token = ?;`;
  },
  updateUserImage: () => {
    return `UPDATE users
    JOIN logins
    ON users.id = logins.user_id
    SET image = ?
     WHERE token = ?;`;
  },

  updateEmailPref: () => {
    return `UPDATE users
                JOIN logins
                ON users.id = logins.user_id
                SET notification_emails = ?
                WHERE token = ?;`;
  },

  updateTeamName: () => {
    return `INSERT INTO fantasy
            (team_name)
            VALUES
            (?)`;
  },

  insertFantasyLineup: () => {
    return `INSERT INTO line_up
    (user_id, code)
    VALUES
    (?, ?)`;
  },

  forgotPassword: () => {
    return `UPDATE users
    SET password = ?
    WHERE email = ?;`;
  },

  selectUser: () => {
    return `SELECT email, 
    user_name AS userName, 
    image, 
    notification_emails AS notificationEmails
                    FROM users
                        WHERE id = ?
                            LIMIT 1`;
  },

  selectFantasy: () => {
    return `SELECT team_name AS teamName
    FROM fantasy
        WHERE user_id = ?
            LIMIT 1`;
  },

  deleteLineup: () => {
    return `DELETE FROM line_up
    WHERE user_id = ?`;
  },

  selectLineUp: () => {
    return `SELECT code FROM line_up WHERE user_id = ?`;
  },
  selectScoreDeduction: () => {
    return `SELECT score_deduction FROM fantasy WHERE user_id = ?`;
  },
  selectTable: () => {
    return `SELECT team_name, score_deduction, total_points from fantasy `
  }
};
