const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const projectsRoutes = require("./api/routes/projects");
const eventsRoutes = require("./api/routes/events");
const developersProfilesRoutes = require('./api/routes/developersProfiles');
const projectRequestsRoutes = require("./api/routes/projectRequests");

mongoose.connect(
    "mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW + "@haifadevdb-ra57o.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true
    });

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW + "@haifadevdb-ra57o.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useUnifiedTopology: true
});
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Routes wich should handle requests
app.use("/projects", projectsRoutes);
app.use('/events', eventsRoutes);
app.use('/developersProfiles', developersProfilesRoutes);
app.use("/projectRequests", projectRequestsRoutes);

// Errors
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;