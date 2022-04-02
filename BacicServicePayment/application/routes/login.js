import express from "express";
import { check, validationResult } from 'express-validator';

const router=express.Router();

router.get("/",(req,res,next)=>{
    res.render('login', { title: 'Login' });
});

router.post('/',
[
  check('UserName')
    .isLength({ min: 3 })
    .withMessage('Informe o Usuário'),
  check('Password')
    .isLength({ min: 3 })
    .withMessage('Informe a Senha'),
],
(req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        res.send('dashboard', { title: 'Dashboard'});
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
});

module.exports=router
