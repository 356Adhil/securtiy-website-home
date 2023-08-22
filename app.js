var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

// Load env vars
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var NewsRouter = require("./routes/NewsDetails");
var gridRouter = require("./routes/newsgrid");
var AboutRouter = require("./routes/About");
var ContactRouter = require("./routes/Contact");

var faqRouter = require("./routes/faq");
var projects_detailsRouter = require("./routes/projects-details");
var projectsRouter = require("./routes/projects");
var services_detailsRouter = require("./routes/services-details");
var servicesRouter = require("./routes/services");
var team_detailsRouter = require("./routes/team-details");
var teamRouter = require("./routes/team");
var testimonialRouter = require("./routes/testimonial");

var app = express();

// Connect to MongoDB database
connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/News-Details", NewsRouter);
app.use("/newsgrid", gridRouter);
app.use("/About", AboutRouter);
app.use("/Contact", ContactRouter);
app.use("/faq", faqRouter);

app.use("/project-details", projects_detailsRouter);
app.use("/projects", projectsRouter);
app.use("/service-details", services_detailsRouter);
app.use("/services", servicesRouter);
app.use("/team-details", team_detailsRouter);
app.use("/team", teamRouter);
app.use("/testimonial", testimonialRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // res.status(404).render("404")
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
