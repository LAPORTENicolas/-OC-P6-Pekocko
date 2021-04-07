const Sauce = require('../models/sauce');
const fs    = require('fs');

// Envoie la liste des sauces, req = vide, res = tableau des sauces
exports.listSauces  = (req, res) => {
    Sauce.find()
        .then( sauces => res.status(200).json(sauces))
        .catch(err => res.status(400).json(err))
};

// Envoie la sauce qui a l'id correspondant, req = vide, res = Sauce unique
exports.getSauces   = (req, res) => {
    Sauce.findOne({_id: req.params.id})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json(err))
}

// Enregistre une nouvelle sauce, req = {sauce: Chaîne, image: Fichier}, res = {message}
exports.newSauce    = (req, res) => {
    const formSauce = JSON.parse(req.body.sauce);
    delete formSauce._id;
    const sauce     = new Sauce({
        // ... Permet de compier le contenue
        ...formSauce,
        likes: 0,
        dislikes: 0,
        // Formate l'url de l'image en http://localhost:3000/images/LeNomDuFuchuer.ext
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
        .catch(err => res.status(400).json(err))
}

// Met a jour la sauce req = Sauce(JSON) OU {sauce: Chaîne, image: Fichier}, res = {message}
exports.putSauce    = (req, res) => {
    // Vérifie si la sauce existe si oui la modifie
    Sauce.updateOne({_id: req.params.id}, {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        heat: req.body.heat,
    })
        .then(() => res.status(200).json({message: 'Sauce modifié'}))
        .catch( err => res.status(400).json(err));
}

// Supprime une sauce req = vide, res = {message}
exports.deleteSauce = (req, res) => {
    // Vérifie si la sauce existe
    Sauce.findOne({_id: req.params.id})
        // Si elle existe
        .then(data => {
            // Permet de recupere le nom de l'images avec l'extension
            const fileName = data.imageUrl.split('/images/')[1];
            // Suprime l'image
            fs.unlink(`images/${fileName}`, () => {
                // Supprime la sauce
                Sauce.deleteOne({_id: req.params.id})
                    .then( () => res.status(200).json({message: 'Sauce supprimé'}))
                    .catch( err => res.status(400).json(err));
            })
        })
        .catch(err => res.status(400).json(err))
}

// Permet de liker ou de disliker
exports.like = (req, res) => {
    // Si la valeur de req.body.like est de -1 Mettre un dislike 0 enlever le like ou le dislikes 1 met un like
    switch (req.body.like){
        case 0:
            // Si une sauce existe avec l'id en parametre
            Sauce.findOne({_id: req.params.id})
                .then(data => {
                    // On fait une bloucle de tout les utlisateur
                    for (let i in data.usersDisliked){
                        if (data.usersDisliked[i] === req.body.userId){
                            // Si l'utilisateur a disliikes on recupere le tableau puis on elever sont username de ce tableau et on enleve -1 au dislikes
                            let tmpTab      = data.usersDisliked;
                            let tmpDislike  = data.dislikes - 1;
                            tmpTab.splice(i, 1);
                            // Met a jour la sauce
                            Sauce.updateOne({_id: req.params.id}, {usersDisliked: tmpTab, dislikes: tmpDislike})
                                .then(() => res.status(201).json({message: 'Dislike retiré'}))
                                .catch(err => res.status(400).json(err));
                        }
                    }
                    for (let i in data.usersLiked){
                        if (data.usersLiked[i] === req.body.userId){
                            let tmpTab  = data.usersLiked;
                            let tmpLike = data.likes - 1;
                            tmpTab.splice(i, 1);
                            Sauce.updateOne({_id: req.params.id}, {usersLiked: tmpTab, likes: tmpLike})
                                .then(() => res.status(201).json({message: 'Like retiré'}))
                                .catch(err => res.status(400).json(err));
                        }
                    }
                })
                .catch(err => res.stack(400).json(err));
            break;
        case 1:
            // Ajout un like dans le sauce correspondante
            Sauce.updateOne({_id: req.params.id}, {$push: {usersLiked: req.body.userId}, $inc: {likes: 1}})
                .then(() => res.status(201).json({message: 'Liker'}))
                .catch( err => res.status(400).json(err))
            break;
        case -1:
            // Ajout un dislike dans le sauce correspondante
            Sauce.updateOne({_id: req.params.id}, {$push: {usersDisliked: req.body.userId}, $inc: {dislikes: 1}})
                .then(() => res.status(201).json({message: 'Disliker'}))
                .catch( err => res.status(400).json(err))
            break;
    }
}