"use strict";

// const {authpage }= require('./middlewares');
var _require = require('express-validator'),
    check = _require.check;

module.exports = function (app) {
  var users = require('../controllers/user.controller.js');

  app.post('/signup', users.create);
  app.get('/users', users.findAll);
  app.post('/login', users.findOne);
};