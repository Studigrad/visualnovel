const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String
    },
    secondName:{
        type:String
    },
    savings:[
        {
            type:String
        }
    ],
    achievements:[
        {
            type:String
        }
    ]
})

const User = mongoose.model('User',UserSchema)
module.exports = User