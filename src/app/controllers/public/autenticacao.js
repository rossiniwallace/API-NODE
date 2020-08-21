const { validationResult } = require('express-validator');
const validacao = require('../../../validators/Usuario');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const auth = require('../../../configs/auth.json');
const mailer = require('../../../modules/mailer');

const usuarioDAO = new (require('../../models/Usuario'))();


gerarToken = (params) => jwt.sign(params, auth.secret, { expiresIn: 300 })

module.exports = {

  async register(req, res) {
    const erros = validationResult(req);

    if (!erros.isEmpty())
      return res.status(400).send(erros)

    let usuario = req.body;

    const now = new Date();
    try {

      const hash = await bcrypt.hash(usuario.password, 10)
      usuario.password = hash;

      const result = await usuarioDAO.inserir({ createdAt: now, ...usuario });

      usuario = { id: result.insertId, ...usuario }

      res.status(201).send({
        usuario,
        token: gerarToken({ id: usuario.id })
      })

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  async authentication(req, res) {
    const { email, password } = req.body;

    let usuario = await usuarioDAO.buscarPorEmail(email)

    usuario = usuario[0];

    try {
      if (!usuario)
        return res.status(401).send({ erro: 'Úsuario não encontrado' })

      bcrypt.compare(password, usuario.password, (erro, retorno) => {
        if (!retorno)
          return res.status(401).send({ erro: erro })

        delete usuario.password
        res.send({ usuario, token: gerarToken({ id: usuario.id }) })
      })
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }

  },

  async forgot_password(req, res) {

    const { email } = req.body;

    let usuario = await usuarioDAO.buscarPorEmail(email);

    usuario = usuario[0];

    try {

      if (!usuario)
        return res.status(401).send({ erro: 'Úsuario não encontrado' })

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();

      now.setHours(now.getHours() + 1);

      usuario = {
        id: usuario.id,
        passwordResetToken: token,
        passwordResetExpires: now,
      }

      await usuarioDAO.atualizar(usuario);

      mailer.sendMail({
        to: email,
        from: 'wall@devjs.com.br',
        template: 'forgot_password',
        context: { token }

      }, (err) => {
        if (err)
          return res.status(400).send({ erro: 'Cannot send forgot password email' })

        res.send();
      })

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }

  },

  async reset_password(req, res) {

    const { email, token, password } = req.body;

    let usuario = await usuarioDAO.buscarPorEmail(email);

    usuario = usuario[0]
    try {
      if (!usuario)
        return res.status(401).send({ erro: 'User not found' })

      if (token !== usuario.passwordResetToken)
        return res.status(401).send({ erro: 'Token invalid' })

      if (token !== usuario.passwordResetToken)
        return res.status(401).send({ erro: 'Token invalid' })

      const now = new Date();

      if (now.getDate() > usuario.passwordResetExpires)
        return res.status(401).send({ erro: 'Token expired, gererate a new one' })

      const hash = await bcrypt.hash(password, 10)

      usuario = {
        "id": usuario.id,
        "password": hash,
        "passwordResetExpires": null,
        "passwordResetToken": null
      }

      await usuarioDAO.atualizar(usuario);

      res.send()

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

}