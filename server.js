const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    app = express();

// files required
const router = require('./routes');

//port 
const port = process.env.PORT || 3000,
    db = require('./config/keys').mongoURI;

//app middleware use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

//listening
app.listen(port, async () => await console.log('Server on the port 3000'));

//mongo db url
mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: true })
    .then(() => console.log('Database Connected'))
    .catch(() => console.log('Failed to connect'));

app.use('/', router);