const express = require("express");
const router = express.Router();

const passport = require("passport");


router.get("/", (req, res, next)=>{
    if(req.isAuthenticated())
        return res.redirect("/dashboard");
    else
        return next();
}, passport.authenticate('google', { scope:["profile"] }));

router.get("/callback", passport.authenticate("google", {failureRedirect:"/", successRedirect:"/dashboard"}));

module.exports = router;