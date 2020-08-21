const { check, body } = require('express-validator');

const dao = new (require('../app/models/Usuario'))();

class Usuario {

  static validacoes() {
    return [
      check('name').isLength({ 'min': 5, 'max': 150 })
        .withMessage('Campo nome teve ter entre 5 a 150 caracteres'),
      check('email').isEmail()
        .withMessage('Campo email não é válido'),
      check('password').isLength({ 'min': 6, 'max': 15 })
        .withMessage('Campo senha teve ter entre 6 a 15 caracteres'),
      body('email').custom(email => {
        return dao.buscarPorEmail(email)
          .then(res => {
            res = res[0]
            if (res)
              return Promise.reject('Email já cadastrado')
          })
      })
    ]
  }
}

module.exports = Usuario;