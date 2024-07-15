const express = require("express");
const {homepage,
    usersignup,
    usersignin,
    usersignout,

} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();


// POST /user/signup
router.post("/user/signup", usersignup);

// POST /user/signin
router.post("/user/signin", usersignin);

// GET /user/home
router.get("/user/home", isAuthenticated, homepage);

// GET /user/signout
router.get("/user/signout", isAuthenticated, usersignout);



module.exports = router;