const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const User          = require('../models/user');
const map           = {};

function dataMasking(text) {
    let data = '';
    for (let i in text) {
        if(i%2){
            data = data + '*';
        } else {data = data + text[i]}
    }
    return data;
}

// Creation dun compte, req = {email: string, password: string}, res{message: string}
exports.signup  = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création de l'utilisateur
            const user = new User({
                email: dataMasking(req.body.email),
                password: hash
            });
            // Savegarde l'utilisateur
            user.save()
                .then(() => { res.status(201).json({message: 'Utilisateur inscris'})})
                .catch(err => { res.status(401).json(err)});


        })
        .catch(err => res.status(500).json({err}));
};


// Connexion a un compte, req = {email: string, password: string}, res{userId: string, token: string}
exports.login  = (req, res) => {
    // On cherche un utilisateur avec l'email de la requete
    User.find({email: dataMasking(req.body.email)})
        .then(user => {
            if (!user) { res.status(401).json({error: 'Cette email n\'est pas enregistrée'}); }
                // S'il l'email correspond a celle d'un compte, compare les mdp
                bcrypt.compare(req.body.password, user[0].password)
                    .then(valid => {
                        if (!valid){ res.status(401).json({error: 'Le mot de passe n\'est pas correct'})}
                        // Si les mdp corresponde envoie les données utlisateur
                        res.status(200).json({
                            userId: user[0]._id,
                            token: jwt.sign(
                                { userId: user[0].id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h'}
                            )
                        })
                    })
                    .catch(() => { res.status(500).json({err}); })
            })
        .catch(() => { res.status(500).json({error: 'Cette email n\'est pas enregistrée'})})
};