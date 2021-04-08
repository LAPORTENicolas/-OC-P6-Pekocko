const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const User          = require('../models/user');

// Permet de masquer les données
function dataMasking(text) {
    let data = '';
    // Fait un boucle de tout les lettre dans le var text
    for (let i in text) {
        // Si 1 modulo 2
        if(i%2){
            // Replacement du caractere par une étoile
            data = data + '*';
            // Sinon on laisse le caractere
        } else {data = data + text[i]}
    }
    return data;
}

// Creation dun compte, req = {email: string, password: string}, res{message: string}
exports.signup  = (req, res) => {
    // Hash le mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création de l'utilisateur
            const user = new User({
                email: dataMasking(req.body.email),
                password: hash
            });
            // Savegarde l'utilisateur
            user.save()
                .then(_ => res.status(201).json({message: 'Utilisateur inscris'}))
                .catch(err => res.status(400).json({err}));
        })
        .catch(err => res.status(500).json({err}));
};

// Connexion a un compte, req = {email: string, password: string}, res{userId: string, token: string}
exports.login  = (req, res) => {
    // On cherche un utilisateur avec l'email de la requete
    User.find({email: dataMasking(req.body.email)})
        .then(user => {
            if (!user) { res.status(404).json({error: 'Cette email n\'est pas enregistrée'}); }
                // S'il l'email correspond a celle d'un compte, compare les mdp
                bcrypt.compare(req.body.password, user[0].password)
                    .then(valid => {
                        if (!valid){ res.status(401).json({error: "Le mot de passe n'est pas correct"})}
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
                    .catch(err => res.status(500).json({err}))
            })
        .catch(err => res.status(500).json({err}))
};