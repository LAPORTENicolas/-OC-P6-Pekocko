const express   = require('express');
const ctrl      = require('../controllers/saucesCtrl');
const multer   = require('../middleware/multer-config');
const router    = express.Router();

router.get('/', ctrl.listSauces);
router.get('/:id', ctrl.getSauces);
router.post('/', ctrl.newSauce);
router.put('/:id', ctrl.putSauce);
router.delete('/:id', ctrl.deleteSauce);

module.exports  = router;