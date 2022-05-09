const {Router} = require('express')
const router = Router()
const path = require('path');
const express = require('express');
const session = require('express-session'); 
const Answers = require('../models/answers-models')
const Questions = require('../models/questions-model')
const User = require('../models/user-models')
router.use(session({ secret: 'secret' }))
router.use(express.static(path.join(__dirname,'../public')))


router.use((req,res,next)=>{
    if(req.session.userId){
        return next()
    }else{
    return res.redirect('/api/auth/login')
    }
})

// /api/home/id
router.get('/:id',async(req,res)=>{
    const {id} = req.params
    const foundUser = await User.findById(req.session.userId)
    const fQuest = await Questions.find({currId:id});
     //var arrOfPages = fQuest[0].nextQuestion.split(',')
     var arrOfPages = fQuest[0].nextAnswer.split(',')
    let answers = []
    for(let index in arrOfPages){
        let findNext = await Questions.find({currId:arrOfPages[index]});
        answers.push(findNext)
    }
    if(!fQuest[0].choice){
        console.log(fQuest[0].name )
        console.log(fQuest[0].text )
        console.log(fQuest[0].choice )
        for(let answ in answers){
            console.log(answers[answ][0].text)
        }
        
       return res.render('home-page',{foundPage:fQuest[0],answers,foundUser})
    }else{
        console.log(fQuest[0].name )
        console.log(fQuest[0].text )
        console.log(fQuest[0].choice )
        
       return res.render('home-pageIn',{foundPage:fQuest[0],choice:fQuest[0].choice,foundUser})
    }
   
})

router.post('/:id',async(req,res)=>{
    const {id} = req.params
    const foundUser = await User.findById(req.session.userId)
    const fQuest = await Questions.find({currId:id});
    const {choose} = req.body
    if(choose>fQuest[0].choice){
        return res.redirect('/api/home/5')
    }else{
        return res.redirect('/api/home/6')
    }
})


router.get('/',async(req,res)=>{
    const foundUser = await User.findById(req.session.userId)
    res.render('start-page',{foundUser})
})
module.exports = router