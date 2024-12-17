const express = require("express");
const router = require("./app/routes/api");
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: "config.env" });
mongoose
  .connect(process.env.MONGODB_CONNECTION, { autoIndex: true })
  .then((res) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: process.env.MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: process.env.URL_ENCODED }));

app.use(
  rateLimit({
    windowMs: process.env.REQUEST_LIMIT_TIME,
    max: process.env.REQUEST_LIMIT_NUMBER,
  })
);

// Disabling ETags helps avoid caching problems,dynamic content or multiple servers
app.set("etag", false); // environment variable is not working properly
app.use("/api/v1", router);

// Add React Front End Routing
app.get("*", function (req, res) {
  res.status(404).json({
    status: "fail",
    data: "Route does not exist try again with correct Endpoint",
  });
});

module.exports = app;
