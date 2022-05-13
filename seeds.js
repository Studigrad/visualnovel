const mongoose = require('mongoose');
const Question = require('./models/questions-model');
//process.env.MONGODB_URI = 'mongodb+srv://studigrad:Il26032002@cluster0.ey5mg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
process.env.MONGODB_URI =`mongodb://studigrad:Il26032002@cluster0-shard-00-00.ey5mg.mongodb.net:27017,cluster0-shard-00-01.ey5mg.mongodb.net:27017,cluster0-shard-00-02.ey5mg.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-khamk3-shard-0&authSource=admin&retryWrites=true&w=majority`

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

Question.insertMany([
    { name: 'Рассказчик', text: 'Семья с двумя детьми переселяется в новый дом.Ночью отец семейства просыпается от звона разбитого стекла.',img:'house.jpeg',currId:'0',nextAnswer:'1,2,3'},
    { name: 'Me', text: 'Спрятаться под одеяло',img:'house.jpeg',currId:'1',nextQuestion:'4'},
    { name: 'Me', text: 'Осмотреться вокруг',img:'house.jpeg',currId:'2',nextQuestion:'5'},
    { name: 'Me', text: 'Разбудить жену',img:'house.jpeg',currId:'3',nextQuestion:'6'},
    { name: 'Рассказчик', text: 'В темноте внезапно вспыхнули красные глаза и вы почувствовали резкую боль. Вы погибли.',img:'death.jpeg',currId:'4',nextAnswer:'7'},
    { name: 'Рассказчик', text: 'Окна вроде целы. В доме тихо. На часах 1:36. Жены рядом нет,но в ванной горит свет.Что будете делать?',img:'room.jpeg',currId:'5',nextAnswer:'8,9,10'},
    { name: 'Рассказчик', text: 'Жены рядом не оказалось. Но в ванной горит свет.Что будете делать?',img:'room.jpeg',currId:'6',nextAnswer:'2,10,11'},
    { name: 'Me', text: 'Лечь спать',img:'room.jpeg',currId:'8',nextQuestion:'12'},
    { name: 'Me', text: 'Включить свет',img:'room.jpeg',currId:'9',nextQuestion:'13'},
    { name: 'Me', text: 'Зайти в ванную',img:'room.jpeg',currId:'10',nextQuestion:'14'},
    { name: 'Me', text: 'Заглянуть под кровать.',img:'room.jpeg',currId:'11',nextQuestion:'4'},
    { name: 'Рассказчик', text: 'К сожалению, вы не проснулись. Но ничего, зато вам не было больно.',img:'death.jpeg',currId:'12',nextAnswer:'16'},
    { name: 'Рассказчик', text: 'С ванны течет ручеек чего-то красного. Кровь?',img:'bathroom.jpeg',currId:'13',nextAnswer:'10,17'},
    { name: 'Рассказчик', text: 'В ванной плавает окровавленое тело вашей жены. Крови много, но откуда она - не понятно. Что будете делать?',img:'bathroom.jpeg',currId:'14',nextAnswer:'18,19,20'},
    { name: 'Me', text: 'Нелепая смерть',img:'death.jpeg',currId:'7'},
    { name: 'Me', text: 'Мирная смерть',img:'death.jpeg',currId:'16'},
    { name: 'Me', text: 'Выйти в коридор.',img:'bathroom.jpeg',currId:'17',nextQuestion:'21'},
    { name: 'Me', text: 'Осмотреться вокруг',img:'bathroom.jpeg',currId:'18',nextQuestion:'22'},
    { name: 'Me', text: 'Осмотреть тело жены',img:'bathroom.jpeg',currId:'19',nextQuestion:'23'},
    { name: 'Me', text: 'Уйти из ванной',img:'bathroom.jpeg',currId:'20',nextQuestion:'24'},
    { name: 'Рассказчик', text: 'В коридоре тихо.',img:'corridor.jpeg',currId:'21',nextAnswer:'25,26'},
    { name: 'Рассказчик', text: 'Прямо перед вами - ванная с телом.Справа унитаз. Ничего странного не видно.Пол залит кровью.Слева - раковина с зеркалом. Зеркало осталось от предыдущих хозяев и очень понравилось вашей жене. Сейчас от него осталась только рама. А где само стекло?',img:'bathroom.jpeg',currId:'22',nextAnswer:'17,19,27'},
    { name: 'Рассказчик', text: 'Сердце не бьется. Судя по трупному окоченению - часа полтора-два. Вся в мелких царапинках, в которых что-то блестит. Как будто взорвалась стеклянная ваза. Но крови слишком много для таких маленьких порезов. Причину смерти установить не удаётся.',img:'bathroom.jpeg',currId:'23',nextAnswer:'18,20'},
    { name: 'Рассказчик', text: 'На выходе, вы подскальзываетесь и падаете виском на твердый угол и недоразобраного чемодана. Нужно было его убрать!',img:'bathroom.jpeg',currId:'24',nextAnswer:'28'},
    { name: 'Me', text: 'Нелепая смерть',img:'bathroom.jpeg',currId:'28'},
    { name: 'Me', text: 'Выйти на улицу',img:'corridor.jpeg',currId:'25',nextQuestion:'29'},
    { name: 'Me', text: 'Зайти к детям',img:'corridor.jpeg',currId:'26',nextQuestion:'30'},
    { name: 'Me', text: 'Осмотреть раму.',img:'corridor.jpeg',currId:'27',nextQuestion:'31'},
    { name: 'Рассказчик', text: 'Все вокруг залито лунным светом.Внезапно, тишину разрывает громкий детский крик. Окно детской взрывается изнутри осколками. В проем кубарем вываливаются дети. за ними тянется странный черный туман. Что делать?',img:'street.jpeg',currId:'29',nextAnswer:'32,33,34'},
    { name: 'Рассказчик', text: 'Зайдя в детскую, вы видите,что лунный свет освещает странную темную дымку, которая тянется к спящим детям от зеркала.Зеркала,оставшегося от предыдущих хозяев. Внезапно, дымка дергается в вашу сторону и вы видите светящиеся красные глаза! что вы будете делать?',img:'children.jpeg',currId:'30',nextAnswer:'34'},
    { name: 'Рассказчик', text: 'Рама пуста, как будто стекла никогда там не было. Но в раковине блестят осколки. Странно. Если стекло было некачественное, то должны были остаться царапины. Что-то мне это не нравится.',img:'bathroom.jpeg',currId:'31',nextAnswer:'17,35'},
    { name: 'Me', text: 'Крикнуть детям, чтоб убегали, а самому отвлечь внимание.',img:'street.jpeg',currId:'32',nextQuestion:'36'},
    { name: 'Me', text: 'Хватать детей и бежать к соседям.',img:'street.jpeg',currId:'33',nextQuestion:'37'},
    { name: 'Me', text: 'Экспекто Патронум!',img:'street.jpeg',currId:'34',nextQuestion:'38'},
    { name: 'Me', text: 'Позвонить в полицию',img:'bathroom.jpeg',currId:'35',nextQuestion:'39'},
    { name: 'Рассказчик', text: 'Дети слишком напуганы, поэтому кидаются к вам. Тьма двигается за ними. В отчаянии, вы закрываете собою детей. Последнее, что вы видите в своей жизни - горящие красным глаза.',img:'death.jpeg',currId:'36',nextAnswer:'40'},
    { name: 'Рассказчик', text: 'Соседи вызывают полицию, но сыщики ничего не нашли, а труп жены исчез бесследно. После всего этого вы переезжаете в Канаду. Возможно, большое количество соленой воды защитит вас.',img:'street.jpeg',currId:'37',nextAnswer:'41'},
    { name: 'Рассказчик', text: 'Как ни странно, это срабатывает. Дымка скукоживается и шарахается от вас. Вы хватаете детей и бежите к соседям. Соседи вызывают полицию, но сыщики ничего не нашли, а труп жены исчез бесследно. После всего этого вы переезжаете в Канаду. Возможно, большое количество соленой воды защитит вас.',img:'street.jpeg',currId:'38',nextAnswer:'41'},
    { name: 'Рассказчик', text: 'Полиция приехала быстро. С детьми все хорошо, но вы теперь вдовец. Не желая оставаться в этом доме, вы его продаете и уезжаете в Нью-Йорк.',img:'streat.jpeg',currId:'39',nextAnswer:'41'},
    { name: 'Me', text: 'Конец',img:'street.jpeg',currId:'41'},
    { name: 'Me', text: 'Хороший отец!',img:'death.jpeg',currId:'40'},
]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});