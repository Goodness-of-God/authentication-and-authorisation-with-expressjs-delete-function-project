const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const tokenVerification = (req, res, next) => {
  console.log(req.body, req.query.token)
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req?.signedCookies?.user?.token;
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "Token is not provided.",
      status: 403,
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // console.log(`Token: ${decoded}`);

    req.user = decoded;
  } catch (err) {
    console.log("Failed to authenticate token.");
    return res.status(401).send({
      auth: false,
      message: "Failed to authenticate token.",
      status: 401,
    });
  }
  return next();
};

module.exports = tokenVerification;
