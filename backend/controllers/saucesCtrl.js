// Envoie la liste des sauces, req = vide, res = tableau des sauces
exports.listSauces  = (req, res) => {
    res.status(200).json({message: 'Tableau des sauces'});
};

// Envoie la sauce qui a l'id correspondant, req = vide, res = Sauce unique
exports.getSauces   = (req, res) => {
    res.status(200).json({message: 'Une sauce'});
}

// Enregistre une nouvelle sauce, req = {sauce: Chaîne, image: Fichier}, res = {message}
exports.newSauce    = (req, res) => {
    res.status(500).json({message: 'Sauce enregistrer'});
}

// Met a jour la sauce req = Sauce(JSON) OU {sauce: Chaîne, image: Fichier}, res = {message}
exports.putSauce    = (req, res) => {
    res.status(201).json({message: 'Sauce modifié'});
}

// Supprime une sauce req = vide, res = {message}
exports.deleteSauce = (req, res) => {
    res.status(200).json({message: 'Sauce supprimé'});
}