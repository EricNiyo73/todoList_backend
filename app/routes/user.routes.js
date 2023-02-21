// const {authpage }= require('./middlewares');
const {check} =require('express-validator');
module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    app.post('/signup',users.create);
    app.get('/users',users.findAll);
    app.post('/login',users.findOne);
}