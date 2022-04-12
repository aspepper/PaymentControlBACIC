import express from "express";
import { check, validationResult } from 'express-validator';

const router=express.Router();

router.get('/', (req, res) => {
    res.render('revenue', { title: 'Meus Recebimentos' });
});

module.exports=router



