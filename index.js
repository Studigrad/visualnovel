const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session'); 
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken')
//var bodyParser = require('body-parser');
const db = require('./controllers/connect')
const homeRoute = require('./routes/home-routes')
const auth = require('./routes/auth-routes')
const Page = require('./models/answers-models')
const User = require('./models/user-models');
const Question = require('./models/questions-model');
const Answer = require('./models/answers-models');

app = express();

db();

const port = process.env.PORT ?? 8050
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(session({ secret: 'secret' }))
//app.use(bodyParser.urlencoded())

// set up multer for storing uploaded files
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });



app.get('/',(req,res)=>{
    if(req.session.userId){
        res.redirect('/start')
    }else{
        res.redirect('/api/auth/login')
    }
})


app.use('/api/home',homeRoute)
app.use('/api/auth',auth)


app.get('/start',async(req,res)=>{
    if(req.session.userId){
    const foundUser = await User.findById(req.session.userId)
    res.render('start-page',{foundUser})
    }else{
        res.redirect('/api/auth/login')
    }
})

app.get('/add',(req,res)=>{
    res.render('add-question')
})

//app.get('/add-answer',(req,res)=>{
//    res.render('add-answers')
//})
app.post('/add-questions',upload.single('photo'),async(req,res,next)=>{
    const {name,text,currId,choice,nextQuestion,nextAnswer,nextId,prevId,photo} = req.body

    const newQ = new Question({
        name,
        text,
        choice,
        currId,
        nextQuestion,
        nextAnswer,
        prevId,
        photo:
        {
            data: fs.readFileSync(path.join(__dirname,'uploads',req.file.filename)),
            contentType: 'image/jpeg'
        }
    })

    try{
        const result = await newQ.save()
    }catch(e){  
        if(e.code!=11000){
            return res.status(400).json({
                "success": false,
                "message": e.message
              })
        }else{
            return res.status(400).json({
                "success": false,
                "message": "Error"
              })
        }
    }

    res.send('Page added') 
})
/*
app.post('/add-answers',upload.single('photo'),async(req,res,next)=>{
    const {name,text,currId,choice,nextId,prevId,photo} = req.body

    const newAnsw = new Answer({
        name,
        text,
        currId,
        nextId,
        prevId,
        photo:
        {
            data: fs.readFileSync(path.join(__dirname,'uploads',req.file.filename)),
            contentType: 'image/jpeg'
        }
    })

    try{
        const result = await newAnsw.save()
    }catch(e){  
        if(e.code!=11000){
            return res.status(400).json({
                "success": false,
                "message": e.message
              })
        }else{
            return res.status(400).json({
                "success": false,
                "message": "Error"
              })
        }
    }

    res.send('Answer added') 
})

*/

app.listen(port,()=>{
    console.log('Server is running')
})