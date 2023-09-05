var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

// Routes for Ejs
const auth = require("./routes/auth.js");
const user = require("./routes/user.js");
const userType = require("./routes/userType.js");
const menu = require("./routes/menu.js");
const subMenu = require("./routes/subMenu.js");
const menuRole = require("./routes/menuRole.js");
const subMenuRole = require("./routes/subMenuRole.js");
const appointment = require("./routes/appointment.js");
const franchise = require("./routes/franchise.js");
const dashboard = require("./routes/dashboard.js");
const faq = require("./routes/faq.js");
const aboutUs = require("./routes/aboutUs");
const contactUs = require("./routes/contactUs");
const gallery = require("./routes/gallery");
const news = require("./routes/news");
const ourSpeciality = require("./routes/ourSpeciality");
const ourTeam = require("./routes/ourTeam");
const testimonial = require("./routes/testimonial");
const banner = require("./routes/banner");
const career = require("./routes/career");
const certificateofAppreciation = require("./routes/certificateOfAppreciation");
const displayCount = require("./routes/displayCount");
const enquiry = require("./routes/enquiry");
const ourService = require("./routes/ourService");

// Routes for Ejs

const indexRouter = require("./routes/EjsIndex");
const NewsRouter = require("./routes/EjsNewsDetails");
const gridRouter = require("./routes/EjsNewsgrid");
const AboutRouter = require("./routes/EjsAbout");
const ContactRouter = require("./routes/EjsContact");
const CareerRouter = require("./routes/EjsCareer");

const faqRouter = require("./routes/EjsFaq");
const services_detailsRouter = require("./routes/EjsServices-details");
const servicesRouter = require("./routes/EjsServices");
const team_detailsRouter = require("./routes/EjsTeam-details");
const teamRouter = require("./routes/EjsTeam");
const testimonialRouter = require("./routes/EjsTestimonial");

const app = express();

// Connect to MongoDB database
connectDB();

// Configure CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8020",
  "https://icy-forest-021334710.3.azurestaticapps.net",
  "https://event-manager.syd1.cdn.digitaloceanspaces.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Not For Ejs 

app.use("/images", express.static("./public/user"));
app.use("/images", express.static("./public/proteincategory"));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/News-Details", NewsRouter);
app.use("/newsgrid", gridRouter);
app.use("/About", AboutRouter);
app.use("/Contact", ContactRouter);
app.use("/Career", CareerRouter);
app.use("/faq", faqRouter);
app.use("/service-details", services_detailsRouter);
app.use("/services", servicesRouter);
app.use("/team-details", team_detailsRouter);
app.use("/team", teamRouter);
app.use("/testimonial", testimonialRouter);


// Not For Ejs 
// mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/user-type", userType);
app.use("/api/v1/menu", menu);
app.use("/api/v1/sub-menu", subMenu);
app.use("/api/v1/menu-role", menuRole);
app.use("/api/v1/submenu-role", subMenuRole);
app.use("/api/v1/appointment", appointment);
app.use("/api/v1/franchise", franchise);
app.use("/api/v1/dashboard", dashboard);
app.use("/api/v1/faq", faq);
app.use("/api/v1/about-us", aboutUs);
app.use("/api/v1/contact-us", contactUs);
app.use("/api/v1/gallery", gallery);
app.use("/api/v1/news", news);
app.use("/api/v1/our-speciality", ourSpeciality);
app.use("/api/v1/our-team", ourTeam);
app.use("/api/v1/testimonial", testimonial);
app.use("/api/v1/banner", banner);
app.use("/api/v1/career", career);
app.use("/api/v1/certificateof-appreciation", certificateofAppreciation);
app.use("/api/v1/display-count", displayCount);
app.use("/api/v1/enquiry", enquiry);
app.use("/api/v1/our-service", ourService);


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
