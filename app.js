const express = require("express");
const app = express();
const tasks = require("./Routers/tasks");
// require("dotenv").config();
require("dotenv").config({path:"./etc/secrets/.env"});
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorhandler");
const {initalize} = require("./Controllers/tasks");

//Morgan Bhai
const morgan = require("morgan");

//DB
const connectDB =  require("./db/connection");

//middleware
app.use(morgan("short"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use("/api/tasks", tasks);

app.get("*", notFound);

app.use(errorHandler);

const port = process.env.PORT||4200;

const start = async()=>{
    try {
        initalize();
        console.log(process.env.MONGO_URI);
        await connectDB(process.env.MONGO_URI);  
        app.listen(port, ()=> console.log(`Server listening to port ${port}................`));
    } catch (error) {
        console.log(error);
    }
}

start();