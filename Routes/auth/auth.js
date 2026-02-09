const express = require("express");
const router = express.Router();
const authCtrl = require("../../controllers/auth");

router.use(express.urlencoded({ extended: false }));

// Middleware to set user context for all routes
const setUserContext = (req, res, next) => {
    res.locals.isLoggedIn = req.session.userId ? true : false;
    res.locals.userName = req.session.userName || '';
    next();
};

router.use(setUserContext);

router.get('/register', (req, res) => {
  res.render('auth/register', {
    error: null,
    registrationSuccess: null
  });
});

router.post("/save-user", authCtrl.saveUser);

router.get("/login", (req, res) => res.render("auth/login", { error: "" }));

router.post("/login", authCtrl.loginUser);
router.get("/logout", authCtrl.logoutUser);

module.exports = router;
