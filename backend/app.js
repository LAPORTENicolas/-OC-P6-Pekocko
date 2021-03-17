const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const routesLogin   = require('./routes/authStuff');
const routesOther   = require('./routes/saucesStuff');
const app           = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user:azert123@cluster0.syoaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('connecté a mongoDB'); })
    .catch((err) => { console.log(err); })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', routesLogin);
app.use('/api/sauces', routesOther);

module.exports  = app;