import express from "express";
import { check, validationResult } from 'express-validator';

const router=express.Router();

router.get('/', (req, res) => {
    res.render('user', { title: 'Usuário' });
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
  check('Email')
    .isLength({ min: 3 })
    .withMessage('Informe o Email'),
  check('Mobile')
    .isLength({ min: 9 })
    .withMessage('Informe o Celular'),
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



