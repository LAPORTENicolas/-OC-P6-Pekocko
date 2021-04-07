const jwt       = require('jsonwebtoken');

module.exports  = (req, res, next) => {
    try {
        // Récupere le token
        const token         = req.headers.authorization.split(' ')[1];
        // Décode le token
        const decodeToken   = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Recupere le token
        const userId        = decodeToken.userId;

        //Vérifie si le token est valide
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Token invalide';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            // Créer une nouvelle erreur
            error: new Error('Requete invalide')
        })
    }
}