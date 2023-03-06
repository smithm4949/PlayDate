const controller = require('../controllers/ownerController');
const routerSetupHelper = require('../../utils/routerHelper');

const config = {localPath: '/owners', routes: [
  {http: 'get', path: '/', method: 'getAll'},
  {http: 'post', path: '/', method: 'create'},
  {http: 'get', path: '/:id', method: 'getOne'},
  {http: 'put', path: '/:id', method: 'update'},
  {http: 'delete', path: '/:id', method: 'delete'},
  {http: 'post', path: '/login', method: 'login'},
  {http: 'post', path: '/logout', method: 'logout'}
]};

const router = routerSetupHelper(config, controller);
router.post('/owners/upload', controller.uploadPic);

module.exports = router;