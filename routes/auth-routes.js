const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const session = require('express-session'); 
const User = require('../models/user-models')

router.use(session({ secret: 'secret' }))

// /api/auth/register
router.get('/register',(req,res)=>{
   res.render('register-page')
 })


router.post('/register',async(req,res)=>{
   try{
    const {email,password,firstName,secondName} = req.body;

    const ifExists = await User.findOne({email})
    if(ifExists){
     return res.status(400).json({error:"User with this email already exists"})
    } else {
      const newUser = new User({email,password,firstName,secondName})
      await newUser.save()
      const token = jwt.sign(
         { userId:newUser._id },
         'SECRET',
         {expiresIn: '1h'}
      )
      req.session.token = token
      req.session.userId = newUser._id  
    }
 
   

    if(req.get('Accept') === 'application/json'){
      return res.status(201).json({success:"User successfully registred"})
   } else {
      return res.redirect("/start") //redirect to the file
   }

   }catch(e){
      console.log(e)
      res.status(500).json({error:"Undefined Error"})
   }
})

// /api/auth/login
router.get('/login',(req,res)=>{
   res.render('login-page')
 })


router.post('/login',async(req,res)=>{
   try{
      const {email,password} = req.body;
      const foundUser = await User.findOne({email})

      if(!foundUser){
         return res.status(400).json({error:"User not found"})
      }
      if(!password == foundUser.password){
         return res.status(400).json({error:"Password is incorrect"})
      }

      const token = jwt.sign(
         { userId:foundUser._id },
         'SECRET',
         {expiresIn: '1h'}
      )
      req.session.token = token
      req.session.userId = foundUser._id  
       
      if(req.get('Accept') === 'application/json'){
         res.json({token,userId:foundUser._id})
      } else {
         return res.redirect("/start") //redirect to the file
      }

   }catch(e){
      res.status(500).json({error:e})
   }
})

module.exports = router

