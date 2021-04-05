const multer        = require('multer');

// Dictionaire des MINE_TYPES autoriser
const MINE_TYPES    = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage       = multer.diskStorage({
    destination: (req, file, callback) => {
        // Le callback prends un 1er arg Null car pas d'erreur, et le 2eme nom du dossier
        callback(null, 'images');
    },
    filename: (req, file, callback) =>{
        // Remplace les ' ' par des _
        const name      = file.originalname.split(' ').join('_');
        const extension = MINE_TYPES[file.mimetype];
        // Le callback prends un 1er arg Null car pas d'erreur, et le 2eme nom du fichier (n)
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportaion du middleware methode multer arg 1 le storage et .single car un fichier arg 'image' car le fichier attendu et une image
module.exports      = multer({storage: storage}).single('image');