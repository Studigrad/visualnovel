const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session'); 
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken')

const db = require('./controllers/connect')
const homeRoute = require('./routes/home-routes')
const auth = require('./routes/auth-routes')
const Pages = require('./models/page-models')
const User = require('./models/user-models')

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
    const foundUser = await User.findById(req.session.userId)
    res.render('start-page',{foundUser})
})

app.get('/add',(req,res)=>{
    res.render('add-page')
})
app.post('/add',async(req,res)=>{
    res.send('Input pages') 
})

app.listen(port,()=>{
    console.log('Server is running')
})