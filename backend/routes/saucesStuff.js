const express   = require('express');
const fs        = require('fs');
const router    = express.Router();
const ctrl      = require('../controllers/saucesCtrl');

const auth      = require('../middleware/auth');
const multer    = require('../middleware/multer-config');


router.get('/', auth, ctrl.listSauces);
router.get('/:id', auth, ctrl.getSauces);
router.post('/', auth, multer, ctrl.newSauce);
router.put('/:id', auth, multer, ctrl.putSauce);
router.delete('/:id', auth, ctrl.deleteSauce);
router.post('/:id/like', auth, ctrl.like);

module.exports  = router;