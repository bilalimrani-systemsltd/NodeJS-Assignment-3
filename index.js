const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const dbConnection = require("./config/connection");

const logger = require('./middleware/logger');
const routes = require('./routes/api');

const app = express();

//BodyParser Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Init Middleware
app.use(logger);

// Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Set Routes
app.use(routes);

const PORT = process.env.PORT || 5000;
dbConnection();
app.listen(PORT, () => {
    console.log(`Server stared on port ${PORT}`)
})
