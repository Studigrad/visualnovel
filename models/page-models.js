const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PageSchema = Schema({
    text:{
        type:String,
        required:true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    nextId:{
        type:String
    },
    prevId:{
        type:String
    }
})

const Page = mongoose.model('Page',PageSchema)
module.exports = Page