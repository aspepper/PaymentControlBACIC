const express = require("express")
const { check, validationResult } = require('express-validator');

const router=express.Router()

router.get('/', (req, res) => {
    res.render('forward_agent', { title: 'Despachante' });
});

router.post('/',
[
  check('UserName')
    .isLength({ min: 3 })
    .withMessage('Informe o Usuário'),
  check('Password')
    .isLength({ min: 3 })
    .withMessage('Informe a Senha'),
  check('Name')
    .isLength({ min: 3 })
    .withMessage('Informe o Nome'),
  check('Document')
    .isLength({ min: 11 })
    .withMessage('Informe o Documento'),
],
(req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        userModel
      res.send('');
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
});

module.exports=router



