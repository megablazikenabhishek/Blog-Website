const express = require("express");
const app = express();

const tasks = require("./Routers/tasks");
const landing = require("./Routers/landing");

require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorhandler");
const {initalize} = require("./Controllers/tasks");

//Morgan Bhai Stanely nahi toh JP lagade xD
const morgan = require("morgan");

//middleware
// app.use(morgan("short"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//sessions
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(session({
    secret : "nahiBatunga",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI1
    }),
    cookie:{
        maxAge: 1000*60*60*24
    }
}));

//DB
const connectDB =  require("./db/connection");
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// const isAuth = require("./middleware/isAuth");

//routes
app.use("/api/tasks", tasks);
app.use("/google",landing);
//speical cases
app.get("/dashboard", (req, res, next)=>{
    if(req.isAuthenticated())
        return res.sendFile(__dirname+"/public/dashboard.html")
    else
        res.status(401).redirect("/");
});
app.get("/logout", (req, res, next)=>{
    req.logOut(err=>{
        if(err)
            next(err);
        else    
            res.redirect("/");
    });
})
app.get("*", notFound);

app.use(errorHandler);

const port = process.env.PORT||4200;

const start = async()=>{
    try {
        initalize();
        await connectDB(process.env.MONGO_URI1);  
        app.listen(port, ()=> console.log(`Server listening to port ${port}................`));
    } catch (error) {
        console.log(error);
    }
}

start();