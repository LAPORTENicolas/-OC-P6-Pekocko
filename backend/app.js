const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const mongoose      = require('mongoose');
const helmet        = require('helmet');
const csurf         = require('csurf');
const routesLogin   = require('./routes/authStuff');
const routesOther   = require('./routes/saucesStuff');
const app           = express();

app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb+srv://user:azert123@cluster0.syoaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('connecté a mongoDB'); })
    .catch((err) => { console.log(err); })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/:id', (req, res) => {
    res.status(200).json();
})
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', routesLogin);
app.use('/api/sauces', routesOther);

module.exports  = app;