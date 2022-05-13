const mongoose = require('mongoose');
const Schema = mongoose.Schema

const questSchema = Schema({
    name:{
        type:String,
        default : null
    },
    text:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    choice:{
        type:String,
        default : null
    },
    currId:{
        type:String
    },
    nextQuestion:{
        type:String,
        default:null
    },
    nextAnswer:{
        type:String,
        default : null
    },
    prevId:{
        type:String,
        default : null
    }
})

const Question = mongoose.model('Question',questSchema)
module.exports = Question