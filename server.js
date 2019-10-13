var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/EducationCostRoutes'); //importing route
routes(app); //register the route
app.listen(port);
console.log('Education Cost RESTful API server started on: ' + port);