module.exports = {
  generateToken: function (len) {
    let token = "";
    let chars = `qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890`;
    const charsLength = chars.length;

    for (let i = 0; i < len; i++) {
      token += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return (token += Date.now());
  },
  generatePassword: function (len) {
    let password = "";
    let lowerChars = `qwertyuiopasdfghjklzxcvbnm`;
    let upperChars = `QWERTYUIOPASDFGHJKLZXCVBNM`;
    let numbers = `1234567890`;
    let specialChars = `!£$%&@`;

    for (let i = 0; i < len; i++) {
      password += lowerChars.charAt(
        Math.floor(Math.random() * lowerChars.length)
      );
      password += upperChars.charAt(
        Math.floor(Math.random() * upperChars.length)
      );
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
      password += specialChars.charAt(
        Math.floor(Math.random() * specialChars.length)
      );
    }
    return password;
  },
};
