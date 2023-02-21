const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {authpage }= require('./middlewares/middlewires.js');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
// const {check} =require('express-validator');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('something went wrong', err);
    process.exit();
});


// define a route
app.get('/', (req, res, next) => {
   return res.json({message: "Welcome  I am testing"});
    
});

require('./app/routes/note.routes.js')(app);

require('./app/routes/user.routes.js')(app);
// listen for requests
app.listen(3002, () => {
    console.log("Server is listening on port 3002");
});