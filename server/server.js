require('dotenv').config();
// always dotenv file will be call on the top of the page so it works 

const express = require("express");
const cors = require("cors");
const app =express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
// lets tackle cors
const corsOption = {
    origin : "http://localhost:5173",
    methods : "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials : true,
};
app.use(cors(corsOption));
app.use(express.json());

// app.use(express.json()); -> this line of code adds express middlewares that parses incoming request bodies with Json payloads.It's important to place this before any routes that need to handle Json data in the request body.This middlewares is responsible for parsing JSON data from requests,and it should be applied at the beginning of your middlewares stack to ensure it's available for all subsequent route handlers.


// Mount the Router : To use the router in your main Express app,you can "mount" it at a specific URL prefix
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data",serviceRoute);

// let's define admin route
app.use("/api/admin",adminRoute);



// error middleware will be call
app.use(errorMiddleware);

const PORT =5000;

connectDb().then(() => {
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
});