const jwt = require("jsonwebtoken");

const EXPIRE = { expiresIn: "24h" };
const KEY = "the-secret-key";
const EncodeToken = function (email, user_id) {
  try {
    const PAYLOAD = { email: email, user_id: user_id };
    return jwt.sign(PAYLOAD, KEY, EXPIRE);
  } catch (err) {
    console.error(err.message);
  }
};

const DecodeToken = function (token) {
  try {
    const PAYLOAD = jwt.verify(token, KEY);
    return PAYLOAD;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

module.exports = { EncodeToken, DecodeToken };
