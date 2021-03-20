const Sauce = require('../models/sauce');

// Envoie la liste des sauces, req = vide, res = tableau des sauces
exports.listSauces  = (req, res) => {
    Sauce.find()
        .then( sauces => res.status(200).json(sauces))
        .catch(err => res.status(400).json({err}))
};

// Envoie la sauce qui a l'id correspondant, req = vide, res = Sauce unique
exports.getSauces   = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err))
}

// Enregistre une nouvelle sauce, req = {sauce: Chaîne, image: Fichier}, res = {message}
exports.newSauce    = (req, res) => {
    const formSauce = JSON.parse(req.body.sauce);
    delete formSauce._id;
    const sauce     = new Sauce({
        ...formSauce,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
        .catch(err => res.status(500).json({err}))
}

// Met a jour la sauce req = Sauce(JSON) OU {sauce: Chaîne, image: Fichier}, res = {message}
exports.putSauce    = (req, res) => {
    res.status(201).json({message: 'Sauce modifié'});
}

// Supprime une sauce req = vide, res = {message}
exports.deleteSauce = (req, res) => {
    Sauce.deleteOne({_id: req.params.id})
        .then( () => res.status(200).json({message: 'Sauce supprimé'}))
        .catch( err => res.status(500).json(err));
}

// Permet de liker ou de disliker
exports.like = (req, res) => {
    switch (req.body.like){
        case 0:
            Sauce.findOne({_id: req.params.id}, (err, data) => {
                for (let i in data.usersLiked){
                    if (data.usersLiked[i] === req.body.userId) {
                        data.usersLiked.splice(i, 1);
                        data.likes--;
                    }
                }
            })
            res.status(201).json();
            break;
        case 1:
            Sauce.updateOne({_id: req.params.id}, {$push: {usersLiked: req.body.userId}, $inc: {likes: 1}})
                .then(() => res.status(201).json({message: 'Liker'}))
                .catch( err => res.status(401).json(err))
            break;
        case -1:
            console.log('-1');
            Sauce.updateOne({_id: req.params.id}, {$push: {usersDisliked: req.body.userId}, $inc: {dislikes: 1}})
                .then(() => res.status(201).json({message: 'Disliker'}))
                .catch( err => res.status(401).json(err))
            break;
    }
}