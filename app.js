require("dotenv").config({path: "./.env"});
const express = require("express");
const app = express();

// database connection
require("./models/database").connectDatabase();

// logger
const logger = require("morgan");
const router = require("./routes/indexRoutes");
app.use(logger("tiny"));

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// session & cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieparser());

// routes
app.use("/user", require("./routes/indexRoutes"));
app.use("/product", require("./routes/productRoutes"));

// error handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");

app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Request URL Not Found! ${req.URL}`, 404));
});
app.use(generatedErrors);


app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`))