const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const tuition_cost = require('./api/routes/tuition_cost');

// for logging requests
app.use(morgan("dev"));

// allows body arguments to be parsed, extended:true == any type can be sent in body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/tuition_cost", tuition_cost);

// if we get to here that means we did not hit a valid route.
app.use((req, res, next) => {
    const error = new Error("Invalid Route.");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;