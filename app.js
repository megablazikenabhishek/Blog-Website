const express = require("express");
const app = express();
const tasks = require("./Routers/tasks");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorhandler");
const {initalize} = require("./Controllers/tasks");

//DB
const connectDB =  require("./db/connection");

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorHandler);

//routes
app.use("/api/tasks", tasks);

app.get("*", notFound);

const port = process.env.PORT||4200;

const start = async()=>{
    try {
        initalize();
        await connectDB(process.env.MONGO_URI);  
        app.listen(port, ()=> console.log(`Server listening to port ${port}................`));
    } catch (error) {
        console.log(err);
    }
}

start();