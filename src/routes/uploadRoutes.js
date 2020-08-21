const router = require('express').Router();
const multer = require('multer')
const multerConfig = require('../configs/multer');
const uploadCtrl = require('../app/controllers/public/uploadFile');

router.post('/file', multer(multerConfig).single('file'),uploadCtrl.upload);

module.exports = router;