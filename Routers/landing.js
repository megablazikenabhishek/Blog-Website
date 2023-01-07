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

router.get("/getPerson", (req, res, next)=>{
    const userId = req.user;
    const data = userId._json;
    const user = {
        username: data.name,
        googleId: data.sub,
        img: data.picture
    }
    res.status(200).json({sucess:true, user});
})

module.exports = router;