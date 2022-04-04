import express from "express";
import { check, validationResult } from 'express-validator';
import passport from 'passport';

const router=express.Router();

router.get('/', (req, res, next) => {
  console.log("entramos no get");
  if (req.query.fail)
  res.render('login', { title: 'Usuário', message: 'Usuário e/ou senha incorretos!' });
    else
  res.render('login', { title: 'Usuário', message: null });
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
  console.log("entramos no post - passport.Strategy");
  console.log(passport.Strategy);
  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login?fail=true' 
  })
  res.redirect("/dashboard");
});

module.exports=router
