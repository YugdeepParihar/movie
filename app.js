const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

// Passport Config
require("./config/passport")(passport);

// Static files
app.use("/static", express.static("static"));

// DB Config
const db = "mongodb+srv://yugdeepparihar098:JHWGPXSLsQ2x6XlC@cluster0.ahp5qck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Set strictQuery
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose
 .connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then(() => console.log("MongoDB Connected"))
 .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
 session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
 })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
 res.locals.success_msg = req.flash("success_msg");
 res.locals.error_msg = req.flash("error_msg");
 res.locals.error = req.flash("error");
 next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on ${PORT}`));
