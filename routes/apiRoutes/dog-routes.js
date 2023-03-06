const router = require('express').Router();
const dogController = require('../controllers/dogController');

router.get('/', dogController.getAll);
router.post('/', dogController.create);
router.get('/:id', dogController.getOne);
router.put('/:id', dogController.update);
router.delete('/:id', dogController.delete);
router.post('/upload', dogController.uploadPic);

module.exports = router;
