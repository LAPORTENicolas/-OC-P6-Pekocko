const express   = require('express');
const router    = express.Router();

const auth      = require('../middleware/auth');
const multer    = require('../middleware/multer-config');

const ctrl      = require('../controllers/saucesCtrl');

router.get('/', auth, ctrl.listSauces);
router.get('/:id', auth, ctrl.getSauces);
router.post('/', auth, ctrl.newSauce);
router.put('/:id', auth, ctrl.putSauce);
router.delete('/:id', auth, ctrl.deleteSauce);

module.exports  = router;