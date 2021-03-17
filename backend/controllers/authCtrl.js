// Création d'un compte, req = {email: string, password: string}, res{message: string}
exports.signup  = (req, res) => {
    res.status(201).json({message: 'Utilisation crier'})
};

// Connexion a un compte, req = {email: string, password: string}, res{userId: string, token: string}
exports.login  = (req, res) => {
    res.status(201).json({message: 'Connexion rssi'})
};