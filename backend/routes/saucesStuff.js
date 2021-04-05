const express   = require('express');
const router    = express.Router();
const ctrl      = require('../controllers/saucesCtrl');

// Permet de vérifier si l'utilisteur est au authentifier
const auth      = require('../middleware/auth');
// Permet de gerer la sauvegarde/supression des images
const multer    = require('../middleware/multer-config');


router.get('/', auth, ctrl.listSauces);
router.get('/:id', auth, ctrl.getSauces);
router.post('/', auth, multer, ctrl.newSauce);
router.put('/:id', auth, multer, ctrl.putSauce);
router.delete('/:id', auth, ctrl.deleteSauce);
router.post('/:id/like', auth, ctrl.like);

module.exports  = router;