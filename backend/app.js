// Inlusions des paquets
const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const mongoose      = require('mongoose');
const helmet        = require('helmet');
const routesLogin   = require('./routes/authStuff');
const routesOther   = require('./routes/saucesStuff');
const app           = express();


// Utilisation de la méthode .jon() de body parser
app.use(express.json());
// Gerer les headers HTTP/HTTPS
app.use(helmet());

// Connection a la base de données
mongoose.connect('mongodb+srv://user:azert123@cluster0.syoaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('connecté a mongoDB'); })
    .catch((err) => { console.log(err); })

// Configuration du header des requettes http
app.use((req, res, next) => {
    // Authorise les req de touts les origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    // Authorise les req GET POST DELETE PUT
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Configuration de la route pour récuperer les images
app.use('/images', express.static(path.join(__dirname, 'images')));
// Configuration des routes pour l'authentification
app.use('/api/auth', routesLogin);
// Configuration des routes pour les sauces
app.use('/api/sauces', routesOther);

module.exports  = app;