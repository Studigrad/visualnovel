const mongoose = require('mongoose');
const Schema = mongoose.Schema

const answSchema = Schema({
    name:{
        type:String,
        default : null
    },
    text:{
        type:String,
        required:true
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
    nextId:{
        type:String,
        default : null
    },
    prevId:{
        type:String
    }
})

const Answer = mongoose.model('Answer',answSchema)
module.exports = Answer