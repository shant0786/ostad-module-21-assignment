const { DecodeToken } = require("../utilities/tokenUtility");
module.exports = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    token = req.cookies["token"];
  }
  const decoded = DecodeToken(token);
  if (!decoded) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized. Please log in to access this resource.",
    });
  }

  const email = decoded["email"];
  const user_id = decoded["user_id"];
  const verified = decoded["verified"];

  req.headers.email = email;
  req.headers.user_id = user_id;
  req.headers.verified = verified;
  next();
};
