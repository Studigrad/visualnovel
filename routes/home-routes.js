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
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use((req,res,next)=>{
    if(req.session.userId){
        return next()
    }else{
    return res.redirect('/api/auth/login')
    }
})

// /api/home/
router.get('/',async(req,res)=>{
    const foundUser = await User.findById(req.session.userId)
    res.render('start-page',{foundUser})
})

// /api/home/achievements
router.get('/achievements',async(req,res)=>{
    const foundUser = await User.findById(req.session.userId)
    res.render('trophey-page',{foundUser})
})

// /api/home/info
router.get('/info',async(req,res)=>{
    const foundUser = await User.findById(req.session.userId)
    res.render('info-page',{foundUser})
})

// /api/home/load
router.get('/load',async(req,res)=>{
    const foundUser = await User.findById(req.session.userId)
    let pages = []
    for (let sav in foundUser.savings){
        let quest = await Questions.find({currId:foundUser.savings[sav]})
        pages.push(quest)
    }
    for (let sav in foundUser.savings){
        console.log(pages[sav][0].name)
    }
    res.render('load-page',{foundUser,pages})
})

// /api/home/id
router.get('/:id',async(req,res)=>{
    const {id} = req.params
    const foundUser = await User.findById(req.session.userId)
    const fQuest = await Questions.find({currId:id});
    
    console.log('nextAnswer text : ',fQuest[0].nextAnswer)
    try{
        const answer = await Questions.find({currId : fQuest[0].nextAnswer})
        if(!answer.nextAnswer && !answer.nextQuestion){
            console.log('Achievment text : ',answer[0].text)
            if(!foundUser.achievements.includes(answer[0].text)){
                foundUser.achievements.push(answer[0].text)
                await foundUser.save()
            }
        }
    }catch{
        console.log('skipped')
    }
    req.session.page = id
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

// /api/home/save
router.post('/save',async(req,res)=>{
    const {currId} = req.body
    console.log(currId)
    const currentUser = await User.findById(req.session.userId)
    currentUser.savings.push(currId)
    await currentUser.save()
    console.log('saved')
    res.redirect(`/api/home/${currId}`)
})

// /api/home/id
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




module.exports = router