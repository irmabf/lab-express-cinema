require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

const moviesRoutes = require("./routes/movies");

// require database configuration
require("./configs/db.config");

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//hbs.registerPartials(__dirname + "/views/partials", function (err) {});

// hbs.registerHelper("ifCond", function (v1, v2, options) {
//   if (v1 === v2) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });

// hbs.registerHelper("getYear", function () {
//   return new Date().getFullYear();
// });

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
// Register the location for handlebars partials here:

// app.use("", homeRoutes);
// app.use("/beers", beersRoutes);
// app.use("/random-beer", randomBeerRoutes);

const index = require("./routes/index");
app.use("/", index);
app.use("/movies", moviesRoutes);

module.exports = app;
