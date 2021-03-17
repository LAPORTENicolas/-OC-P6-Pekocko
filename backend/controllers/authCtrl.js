const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const User      = require('../models/user');


// Creation dun compte, req = {email: string, password: string}, res{message: string}
exports.signup  = (req, res) => {
    // Hachage du mdp
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Savegarde l'utilisateur
            user.save()
                .then(() => { res.status(201).json({message: 'Utilisateur inscris'})})
                .catch(err => { res.status(400).json({err})})
        })
        .catch((err) => { res.status(400).json({err}); })
};

// Connexion a un compte, req = {email: string, password: string}, res{userId: string, token: string}
exports.login  = (req, res) => {
    // On cherche un utilisateur avec l'email de la requete
    User.find({email: req.body.email})
        .then(user => {
            if (!user) { res.status(401).json({error: 'Aucun utilisteur trouvé'}); }
                // S'il l'email correspond a celle d'un compte, compare les mdp
                bcrypt.compare(req.body.password, user[0].password)
                    .then(valid => {
                        if (!valid){ res.status(401).json({error: 'Le mot de passe n\'est pas correct'})}
                        // Si les mdp corresponde envoie les données utlisateur
                        res.status(200).json({
                            userIDd: user[0]._id,
                            token: jwt.sign(
                                { userId: user[0].id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h'}
                            )
                        })
                    })
                    .catch(err => { res.status(500).json({err}); })
            })
        .catch(err => { res.status(500).json({ err })})
};