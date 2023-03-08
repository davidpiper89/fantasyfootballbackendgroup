module.exports = {
  welcomeEmail: (name) => {
    return {
      subject: "Welcome " + name,
      content:
        "Thank you for signing up with Fantasy Football App! Join a league and start managing your own team. Compete against your friends or other fans for the top spot in your league!",
    };
  },

  forgotMail: (password) => {
    return {
      subject: "Forgotton Password ",
      content: `
      Please use this auto generated password to sign in and reset your password.
      New Password = ${password}`,
    };
  },
};
