"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var _require = require('./middlewares/middlewires.js'),
    authpage = _require.authpage;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // Configuring the database

var dbConfig = require('./config/database.config.js');

var mongoose = require('mongoose'); // const {check} =require('express-validator');


mongoose.Promise = global.Promise; // Connecting to the database

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(function () {
  console.log("Successfully connected to the database");
})["catch"](function (err) {
  console.log('something went wrong', err);
  process.exit();
}); // define a route

app.get('/', function (req, res, next) {
  return res.json({
    message: "Welcome  I am testing"
  });
});

require('./app/routes/note.routes.js')(app);

require('./app/routes/user.routes.js')(app); // listen for requests


app.listen(3002, function () {
  console.log("Server is listening on port 3002");
});