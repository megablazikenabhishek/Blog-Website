const passport = require("passport");
const User = require("../models/User");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    passReqToCallback: true
},(req, accessToken, refreshToken, profile,  done)=>{
    // console.log(profile);
    const userId = profile;
    const data = userId._json;
    const user = {
        username: data.name,
        googleId: data.sub,
        img: data.picture
    }
    User.findOne(user)
        .then((obj)=>{
            if(obj)
                return done(null, userId);
            else
                User.create(user)
                    .catch(err=>console.log(err));
            return done(null, userId);
        })
        .catch(err=>console.log(err));
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((userId, done) => {
    done(null, userId);
});