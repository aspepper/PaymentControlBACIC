const express = require("express")
const path = require('path');

const router=express.Router()
router.get("/",(req,res,next)=>{
    res.sendFile('index.html', {root : './application'});
})
  
module.exports=router
