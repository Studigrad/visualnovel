const {Router} = require('express')
const router = Router()
const path = require('path');
const express = require('express');
const session = require('express-session'); 

app.use(session({ secret: 'secret' }))

router.use(express.static(path.join(__dirname,'../public')))

// /api/home/
router.get('/',(req,res)=>{
    res.render('home-page')
})

module.exports = router