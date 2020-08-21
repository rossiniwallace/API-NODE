const router = require('express').Router();

const authCtrl = require('../app/controllers/public/autenticacao');
const validators = require('../validators/Usuario');

router.post('/register',validators.validacoes(),authCtrl.register);
router.post('/authentication',authCtrl.authentication);
router.post('/forgot_password', authCtrl.forgot_password);
router.post('/reset_password', authCtrl.reset_password);

module.exports = router;