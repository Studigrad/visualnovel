const mongoose = require('mongoose');

//process.env.MONGODB_URI = 'mongodb+srv://studigrad:Il26032002@cluster0.ey5mg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
process.env.MONGODB_URI =`mongodb://studigrad:Il26032002@cluster0-shard-00-00.ey5mg.mongodb.net:27017,cluster0-shard-00-01.ey5mg.mongodb.net:27017,cluster0-shard-00-02.ey5mg.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-khamk3-shard-0&authSource=admin&retryWrites=true&w=majority`
const db =  function(){
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});
}

module.exports = db