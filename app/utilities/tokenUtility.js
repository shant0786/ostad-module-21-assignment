const jwt = require("jsonwebtoken");
let dotENV = require("dotenv");
dotENV.config();

const EXPIRES = { expiresIn: process.env.JWT_EXPIRATION_TIME };
const KEY = process.env.JWT_SECRET_KEY;
let PAYLOAD

const EncodeToken = function (email, user_id, verified) {
  try {
    PAYLOAD = { email: email, user_id: user_id, verified };
    return jwt.sign(PAYLOAD, KEY, EXPIRES);
  } catch (err) {
    console.error(err.message);
  }
};

const DecodeToken = function (token) {
  try {
     PAYLOAD = jwt.verify(token, KEY);
    return PAYLOAD;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

module.exports = { EncodeToken, DecodeToken };
